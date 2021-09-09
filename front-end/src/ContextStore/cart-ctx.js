// import React, { useState } from "react";

// const CartContext = React.createContext({
//     modalState: false,
//     modalStateHandler: () => {},
// });

// export const CartContextProvider = (props) => {
//     const [modalState, setModalState] = useState(false);

//     // useEffect(() => {
//     //     const showModal = localStorage.getItem("showModal");

//     //     if (showModal === "1") {
//     //         setModalState(true);
//     //     }
//     // }, []);

//     const modalStateHandler = () => {
//         setModalState(() => {
//             if (modalState === true) {
//                 // localStorage.removeItem("showModal");
//                 return false;
//             } else {
//                 // localStorage.setItem("showModal", "1");
//                 return true;
//             }
//         });
//     };

//     return (
//         <CartContext.Provider
//             value={{
//                 modalStateHandler: modalStateHandler,
//                 modalState: modalState,
//             }}
//         >
//             {props.children}
//         </CartContext.Provider>
//     );
// };

// export default CartContext;
