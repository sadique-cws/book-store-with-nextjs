import CartPage from "../components/CartPage"

const page = () => {
  return (
    <div className="flex px-[10%] mt-5 flex-col">
        <div className="flex flex-1 my-3">
            <h1 className="text-2xl font-semibold">Your Cart (3)</h1>
        </div>
        <CartPage/>
    </div>
  )
}
 
export default page