// Testing component for counter API

// const [counter, setCounter] = useState(0);
// const handleCounter = async (action) => {
//   try {
//     const response = await axios.post(
//       `http://localhost:3100/api/auth/user/${action}`,
//       {},
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       }
//     );
//     setCounter(response.data.counter);
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };
// <Col>
//           <Button
//             className="mx-2"
//             onClick={() => {
//               handleCounter("increment");
//             }}
//           >
//             +
//           </Button>
//           <span className="p-2">{counter}</span>
//           <Button
//             className="mx-2"
//             onClick={() => {
//               handleCounter("decrement");
//             }}
//           >
//             -
//           </Button>
//         </Col>