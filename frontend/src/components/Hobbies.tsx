import { motion } from 'framer-motion';
import InfiniteMenu from './InfiniteMenu'

const items = [
  {
    image: 'https://picsum.photos/300/300?grayscale',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: 'https://google.com/',
    title: 'Item 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  }
];

export function Hobbies() {
  return (
    <section id="hobbies" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-16 md:mb-24">
        
        {/* Entrance Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <span className="text-sm tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-4 block">
            07 / Beyond
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white mb-6">
            Beyond the Code.
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
            The human behind the developer.
          </p>
        </motion.div>

      </div>

      <div className="w-full relative h-[600px] md:h-[700px]">
         <InfiniteMenu items={items} scale={0.8} />
      </div>
    </section>
  )
}