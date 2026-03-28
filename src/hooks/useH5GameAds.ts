/**
 * H5 Games Ad Placement API hook
 *
 * Uses Google's Ad Placement API (adBreak/adConfig) designed for HTML5 games.
 * Ads appear at natural game transitions, not as banner slots.
 *
 * @see https://developers.google.com/ad-placement/apis/adbreak
 */
import { useCallback, useRef, useEffect } from 'react';
import { useAds } from '@/contexts/EnhancedAdContext';
import { logger } from '@/utils/logger';

// Extend Window for H5 Games Ads API
declare global {
  interface Window {
    adsbygoogle: any[];
    adBreak: (config: AdBreakConfig) => void;
    adConfig: (config: AdConfigParams) => void;
  }
}

interface AdBreakConfig {
  type: 'start' | 'next' | 'browse' | 'reward' | 'preroll';
  name?: string;
  adBreakDone?: (info: AdBreakDoneInfo) => void;
  beforeAd?: () => void;
  afterAd?: () => void;
  beforeReward?: (showAdFn: () => void) => void;
  adDismissed?: () => void;
  adViewed?: () => void;
}

interface AdBreakDoneInfo {
  breakType: string;
  breakName: string;
  breakFormat: string;
  breakStatus: 'viewed' | 'dismissed' | 'notReady' | 'timeout' | 'error' | 'frequencyCapped' | 'other';
}

interface AdConfigParams {
  preloadAdBreaks?: 'on' | 'auto';
  sound?: 'on' | 'off';
  onReady?: () => void;
}

// Minimum interval between ads (3 minutes)
const MIN_AD_INTERVAL_MS = 180_000;

export function useH5GameAds() {
  const { shouldShowAds, hasConsentedToAds } = useAds();
  const lastAdTime = useRef<number>(0);
  const isReady = useRef(false);
  const roundsSinceLastAd = useRef(0);

  // Check if enough time has passed since last ad
  const canShowAd = useCallback(() => {
    if (!shouldShowAds || !hasConsentedToAds || !import.meta.env.PROD) {
      return false;
    }
    const now = Date.now();
    return now - lastAdTime.current >= MIN_AD_INTERVAL_MS;
  }, [shouldShowAds, hasConsentedToAds]);

  // Record that an ad was shown
  const recordAdShown = useCallback(() => {
    lastAdTime.current = Date.now();
    roundsSinceLastAd.current = 0;
  }, []);

  /**
   * Show an interstitial ad at a natural game break.
   * Call this between rounds, at game over, or page transitions.
   */
  const showInterstitial = useCallback((
    breakName: string,
    options?: {
      onBeforeAd?: () => void;
      onAfterAd?: () => void;
      onAdBreakDone?: (info: AdBreakDoneInfo) => void;
    }
  ) => {
    if (!canShowAd()) {
      logger.debug('[H5Ads] Skipping interstitial:', breakName, '(cooldown or disabled)');
      options?.onAdBreakDone?.({
        breakType: 'next',
        breakName,
        breakFormat: 'interstitial',
        breakStatus: 'frequencyCapped',
      });
      return;
    }

    if (typeof window.adBreak !== 'function') {
      logger.debug('[H5Ads] adBreak not available');
      options?.onAdBreakDone?.({
        breakType: 'next',
        breakName,
        breakFormat: 'interstitial',
        breakStatus: 'notReady',
      });
      return;
    }

    logger.debug('[H5Ads] Requesting interstitial:', breakName);

    window.adBreak({
      type: 'next',
      name: breakName,
      beforeAd: () => {
        logger.debug('[H5Ads] Ad starting:', breakName);
        options?.onBeforeAd?.();
      },
      afterAd: () => {
        logger.debug('[H5Ads] Ad finished:', breakName);
        recordAdShown();
        options?.onAfterAd?.();
      },
      adBreakDone: (info) => {
        logger.debug('[H5Ads] adBreakDone:', breakName, info.breakStatus);
        options?.onAdBreakDone?.(info);
      },
    });
  }, [canShowAd, recordAdShown]);

  /**
   * Show a rewarded ad. User must opt in.
   * Call this for bonus content like detailed stats.
   */
  const showRewarded = useCallback((
    breakName: string,
    options: {
      onReward: () => void;
      onDismissed?: () => void;
    }
  ) => {
    if (!shouldShowAds || !hasConsentedToAds || !import.meta.env.PROD) {
      // In dev/when ads disabled, just give the reward
      options.onReward();
      return;
    }

    if (typeof window.adBreak !== 'function') {
      options.onReward();
      return;
    }

    logger.debug('[H5Ads] Requesting rewarded ad:', breakName);

    window.adBreak({
      type: 'reward',
      name: breakName,
      beforeReward: (showAdFn) => {
        // The API gives us a function to actually show the ad
        showAdFn();
      },
      adViewed: () => {
        logger.debug('[H5Ads] Rewarded ad viewed:', breakName);
        recordAdShown();
        options.onReward();
      },
      adDismissed: () => {
        logger.debug('[H5Ads] Rewarded ad dismissed:', breakName);
        options.onDismissed?.();
      },
    });
  }, [shouldShowAds, hasConsentedToAds, recordAdShown]);

  /**
   * Show a preroll ad (e.g., when loading a game page).
   */
  const showPreroll = useCallback((breakName: string) => {
    if (!canShowAd()) return;

    if (typeof window.adBreak !== 'function') return;

    logger.debug('[H5Ads] Requesting preroll:', breakName);

    window.adBreak({
      type: 'preroll',
      name: breakName,
      afterAd: () => {
        recordAdShown();
      },
    });
  }, [canShowAd, recordAdShown]);

  /**
   * Track rounds for ad frequency control.
   * Returns true if an ad should be shown (every N rounds).
   */
  const trackRound = useCallback(() => {
    roundsSinceLastAd.current += 1;
    // Show ad every 3-5 rounds
    return roundsSinceLastAd.current >= 4;
  }, []);

  return {
    showInterstitial,
    showRewarded,
    showPreroll,
    trackRound,
    canShowAd: canShowAd(),
    isReady: isReady.current,
  };
}
