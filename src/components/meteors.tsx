// const METEORS = [
//   { left: "53.53%",  delay: "0s",    duration: "14s" },
//   { left: "71.08%",  delay: "3.2s",  duration: "18s" },
//   { left: "5.49%",   delay: "7.5s",  duration: "22s" },
//   { left: "6.77%",   delay: "1.8s",  duration: "16s" },
//   { left: "66.20%",  delay: "5.0s",  duration: "20s" },
//   { left: "35.24%",  delay: "9.1s",  duration: "15s" },
//   { left: "71.35%",  delay: "2.4s",  duration: "25s" },
//   { left: "53.26%",  delay: "11.0s", duration: "17s" },
//   { left: "65.04%",  delay: "6.3s",  duration: "21s" },
//   { left: "63.45%",  delay: "0.8s",  duration: "13s" },
//   { left: "80.25%",  delay: "4.5s",  duration: "19s" },
//   { left: "74.54%",  delay: "8.7s",  duration: "23s" },
//   { left: "13.70%",  delay: "2.1s",  duration: "16s" },
//   { left: "69.46%",  delay: "10.4s", duration: "20s" },
//   { left: "21.11%",  delay: "5.8s",  duration: "24s" },
//   { left: "6.04%",   delay: "1.3s",  duration: "18s" },
//   { left: "29.44%",  delay: "7.9s",  duration: "15s" },
//   { left: "12.30%",  delay: "3.6s",  duration: "22s" },
//   { left: "47.35%",  delay: "9.5s",  duration: "17s" },
//   { left: "97.78%",  delay: "0.5s",  duration: "25s" },
//   { left: "42.49%",  delay: "6.7s",  duration: "14s" },
//   { left: "73.97%",  delay: "12.0s", duration: "20s" },
//   { left: "46.38%",  delay: "4.2s",  duration: "19s" },
//   { left: "98.19%",  delay: "8.0s",  duration: "16s" },
//   { left: "50.05%",  delay: "1.9s",  duration: "23s" },
//   { left: "67.58%",  delay: "5.5s",  duration: "18s" },
//   { left: "10.67%",  delay: "11.3s", duration: "21s" },
//   { left: "23.49%",  delay: "3.0s",  duration: "15s" },
//   { left: "12.57%",  delay: "9.8s",  duration: "24s" },
//   { left: "41.79%",  delay: "7.1s",  duration: "17s" },
// ];

// const STARS = [
//   { top: "8%", left: "12%", size: 1.5, delay: "0s" },
//   { top: "14%", left: "28%", size: 1, delay: "1.2s" },
//   { top: "6%", left: "47%", size: 2, delay: "0.4s" },
//   { top: "18%", left: "63%", size: 1, delay: "2.1s" },
//   { top: "11%", left: "81%", size: 1.5, delay: "0.8s" },
//   { top: "22%", left: "91%", size: 1, delay: "1.6s" },
//   { top: "31%", left: "7%", size: 1, delay: "2.4s" },
//   { top: "38%", left: "22%", size: 2, delay: "0.3s" },
//   { top: "27%", left: "41%", size: 1, delay: "1.8s" },
//   { top: "42%", left: "58%", size: 1.5, delay: "0.9s" },
//   { top: "33%", left: "74%", size: 1, delay: "2.7s" },
//   { top: "48%", left: "88%", size: 1, delay: "1.1s" },
//   { top: "56%", left: "16%", size: 1.5, delay: "0.6s" },
//   { top: "61%", left: "35%", size: 1, delay: "2s" },
//   { top: "53%", left: "52%", size: 2, delay: "1.4s" },
//   { top: "68%", left: "69%", size: 1, delay: "0.2s" },
//   { top: "72%", left: "84%", size: 1.5, delay: "2.3s" },
//   { top: "77%", left: "9%", size: 1, delay: "1.7s" },
//   { top: "82%", left: "31%", size: 1, delay: "0.5s" },
//   { top: "86%", left: "49%", size: 2, delay: "2.8s" },
//   { top: "79%", left: "66%", size: 1, delay: "1.3s" },
//   { top: "90%", left: "78%", size: 1.5, delay: "0.7s" },
//   { top: "93%", left: "18%", size: 1, delay: "2.2s" },
//   { top: "4%", left: "96%", size: 1, delay: "1.9s" },
// ] as const;

// export function MeteorBackground() {
//   return (
//     <div className="meteor-background" aria-hidden="true">
//       {/* Stars */}
//       {STARS.map((star, i) => (
//         <span
//           key={`star-${i}`}
//           className="star-dot"
//           style={{
//             top: star.top,
//             left: star.left,
//             width: `${star.size}px`,
//             height: `${star.size}px`,
//             opacity: 0.3,
//             animationDelay: star.delay,
//             animationDuration: `${2 + parseFloat(star.delay) * 2}s`,
//           }}
//         />
//       ))}

//       {/* Meteors – exact replica Tailwind classes */}
//       {METEORS.map((meteor, index) => (
//         <span
//           key={`meteor-${index}`}
//           className="animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
//           style={{
//             top: "-5px",
//             left: meteor.left,
//             animationDelay: meteor.delay,
//             animationDuration: meteor.duration,
//           }}
//         />
//       ))}
//     </div>
//   );
// }
