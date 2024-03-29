
const page = async () => {

    let countData = await fetch("http://127.0.0.1:3000/api/count");
    countData = await countData.json();
  return (
    <div className="flex gap-5 p-5">
        <div className="flex-1 bg-purple-700 text-white p-5 rounded-lg shadow-lg">
            <h2>{countData.bookCount}</h2>
            <h3>Total Books</h3>
        </div>
        <div className="flex-1 bg-pink-700 text-white p-5 rounded-lg shadow-lg">
            <h2>{countData.orderCount}</h2>
            <h3>Total Orders</h3>
        </div>
        <div className="flex-1 bg-teal-700 text-white p-5 rounded-lg shadow-lg">
            <h2>{countData.categoryCount}</h2>
            <h3>Total Category</h3>
        </div>
        <div className="flex-1 bg-sky-700 text-white p-5 rounded-lg shadow-lg">
            <h2>{countData.userCount}</h2>
            <h3>Total user</h3>
        </div>
    </div>
  )
}

export default page