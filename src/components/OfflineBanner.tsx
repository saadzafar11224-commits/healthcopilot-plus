import { AnimatePresence, motion } from 'framer-motion'

type OfflineBannerProps = {
  isOffline: boolean
  lastSyncTime: number | null
  hasCachedData: boolean
}

function formatCachedTime(timestamp: number | null) {
  if (!timestamp) return 'an unknown time'
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(timestamp)
}

export function OfflineBanner({ isOffline, lastSyncTime, hasCachedData }: OfflineBannerProps) {
  return <AnimatePresence initial={false}>
    {isOffline ? <motion.div className="offline-mode-banner" role="status" initial={{ opacity: 0, y: -72 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -72 }} transition={{ duration: .3, ease: [0.2, 0.8, 0.2, 1] }}>
      <span className="offline-wifi-icon" aria-hidden="true">⌁</span>
      <span>{hasCachedData ? `Offline mode — showing last saved data from ${formatCachedTime(lastSyncTime)}` : 'Offline mode — no saved health data available'}</span>
    </motion.div> : null}
  </AnimatePresence>
}
