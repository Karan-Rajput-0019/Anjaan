import { motion } from 'framer-motion'

const CenterArea = ({ children }) => {
    return (
        <motion.main
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex flex-col items-center justify-center gap-8 px-6"
        >
            {children}
        </motion.main>
    )
}

export default CenterArea
