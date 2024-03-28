import ConnectDb from '@/app/db/Connect'
import Order from '@/app/models/Order';

const page = async () => {
    ConnectDb();

    let callingOrders = await Order.find({"ordered":true}).populate(["userId","address"]);

  return (
    <div className='flex gap-3 flex-col'>
        <div className='flex-1 flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Manage Orders ({callingOrders.length})</h2>
        </div>
       <div className="flex gap-3 ">
       <div className='w-full'>
            <table className='border w-full'>
                <thead>
                    <tr>
                        <th className='border p-2'>Id</th>
                        <th className='border p-2'>User</th>
                        <th className='border p-2'>Date</th>
                        <th className='border p-2'>Address</th>
                        <th className='border p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                   { callingOrders.map((order, index) => {
                   
                    return(
                        <tr key={index}>
                           <td className='border p-2'>{index + 1}</td>
                           <td className='border p-2'>{order.userId.name}</td>
                           <td className='border p-2'>{order.dateOfOrder.toLocaleString()}</td>
                           <td className='border p-2'>{order.address.area} ({order.address.city})</td>
                           
                           <td className='border p-2'>
                               {/* action buttons */}
                               
                           </td>
                          
                        </tr>
                  )
                   })
                  }
                </tbody>
            </table>
        </div>
       </div>
    </div>
  )
}

export default page