import { motion } from "framer-motion"
import React from "react";

const LoadingDot = {
  display: "block",
  width: "2rem",
  height: "2rem",
  backgroundColor: "black",
  borderRadius: "50%"
};

const LoadingContainer = {
  width: "10rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around"
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2
    }
  },
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const DotVariants = {
  initial: {
    y: "0%"
  },
  animate: {
    y: "100%"
  }
};

const DotTransition = {
  duration: 1,
  repeat: Infinity,
  repeatDelay: 0.5,
  ease: "easeInOut"
};

export default function Loader() {
  return (
    <div
      style={{
        paddingTop: "5rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <motion.div
        style={LoadingContainer}
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  );
}

// export default function Loader() {
//     return (
//         <motion.div
//           className="box"
//           animate={{
//             scale: [1, 2, 2, 1, 1],
//             rotate: [0, 0, 180, 180, 0],
//             borderRadius: ["0%", "0%", "50%", "50%", "0%"]
//           }}
//           transition={{
//             duration: 2,
//             ease: "easeInOut",
//             times: [0, 0.2, 0.5, 0.8, 1],
//             repeat: Infinity,
//             repeatDelay: 1
//           }}
//         />
//       );
// } 