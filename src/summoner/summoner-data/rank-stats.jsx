function RankStats({ queueData, queueName }) {
  return (
    <div className='flex flex-col'>
      <div className={`py-1.5 px-2.5 mt-2 rounded-t-lg ${!queueData && 'rounded-b-lg'} bg-slate-900`}>
        <div className='flex justify-between text-zinc-300/95 text-sm laptop:text-base'>
          <span>{queueName}</span>
          {!queueData && <span className='text-zinc-400/90'>Unranked</span>}
        </div>
      </div>
      {queueData && (
        <div className='py-1.5 px-2.5 mb-2 border-t border-zinc-500 rounded-b-lg bg-slate-900'>
          
        </div>
      )}
    </div>
  )
}
export default RankStats;