import ConnectDb from '@/app/db/Connect'
import User from '@/app/models/User';

const page = async () => {
    ConnectDb();

    let callingUsers = await User.find();

  return (
    <div className='flex gap-3 flex-col'>
        <div className='flex-1 flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Manage Users ({callingUsers.length})</h2>
        </div>
       <div className="flex gap-3 ">
       <div className='w-full'>
            <table className='border w-full'>
                <thead>
                    <tr>
                        <th className='border p-2'>Id</th>
                        <th className='border p-2'>Name</th>
                        <th className='border p-2'>Contact</th>
                        <th className='border p-2'>Email</th>
                        <th className='border p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                   { callingUsers.map((user, index) => {
                   
                    return(
                        <tr key={index}>
                           <td className='border p-2'>{index + 1}</td>
                           <td className='border p-2'>{user.name}</td>
                           <td className='border p-2'>{user.contact}</td>
                           <td className='border p-2'>{user.email}</td>
                           
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