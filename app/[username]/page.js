const Username = async ({ params }) => {

  const { username } = await params

  return (
    <>
    {/* {username} */}
      <div className="cover w-full bg-red-100 relative">
        <img className="object-cover w-full" src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/20.gif?token-hash=py2NffPgVZJ_D3KVIWQy3gULEUawvLTB1KS-4uTwq2I%3D&token-time=1775260800" alt="" />
      
      <div className=" profile-pic rounded-lg border w-40 h-40 absolute top-100 right-[45%] ">
        <img className="object-cover w-full h-full" width={200} height={100} src="https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>
      </div>

      <div className="info flex justify-center items-center flex-col my-30 gap-2">
        <div className="font-bold text-3xl">
           @{username}
        </div>
        <div className="text-gray-400">
          Creating Animated art for VTT's
        </div>
        <div className="text-gray-400">
          23,311 members108 posts$17,590/release
        </div>
      </div>
      
    </>
  )
}

export default Username