import NavSide from '../navbar/NavSide';

export default function RootLayout({children}) {
  return (
    <div className='flex'>
      <div className='hidden laptop:flex'>
        <NavSide />
      </div>
      <div className='flex-1 w-full'>
        <div id='root'>
          {children}
        </div>
      </div>
    </div>
  )
}