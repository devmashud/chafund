const Username = async ({ params }) => {

  const { username } = await params

  return (
    <>
      <div className='text-white font-bold text-3xl border border-white h-7'>
        <h1 className='font-bold text-white text-5xl'>
          {username}
        </h1>
      </div>
      <h3>opi ahmed</h3>
    </>
  )
}

export default Username