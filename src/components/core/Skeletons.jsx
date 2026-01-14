import { motion } from 'framer-motion'

export const Skeleton = ({ className, variant = 'rect' }) => {
    const variants = {
        rect: 'rounded-lg',
        circle: 'rounded-full',
        softer: 'rounded-softer',
        softest: 'rounded-softest'
    }

    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`bg-white/5 border border-white/10 ${variants[variant]} ${className}`}
        />
    )
}

export const WidgetSkeleton = () => (
    <div className="w-full h-full flex flex-col gap-4 p-6">
        <Skeleton className="w-1/3 h-6 mb-4" />
        <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24" variant="softer" />
            <Skeleton className="h-24" variant="softer" />
            <Skeleton className="h-32 col-span-2" variant="softer" />
        </div>
        <div className="flex gap-2 mt-auto">
            <Skeleton className="w-12 h-12" variant="circle" />
            <Skeleton className="flex-1 h-12" variant="rect" />
        </div>
    </div>
)

export const CardSkeleton = () => (
    <div className="glass-strong rounded-softer p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10" variant="circle" />
            <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="w-3/4 h-4" />
                <Skeleton className="w-1/2 h-3" />
            </div>
        </div>
        <Skeleton className="w-full h-20" variant="rect" />
    </div>
)
