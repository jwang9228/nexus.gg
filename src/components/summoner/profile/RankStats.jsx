import Image from 'next/image';

export default function RankStats({queueData, queueName}) {
  const getRankByTier = (tier, rank) => {
    if (tier === 'MASTER' || tier === 'GRANDMASTER' || tier === 'CHALLENGER') {
      return '';
    } else {
      const rankMapping = {
        'I': '1', 'II': '2', 'III': '3', 'IV': '4',
      };
      return rankMapping[rank] || '';
    }
  };

  const calculateWinrate = (wins, losses) => {
    const totalGames = wins + losses;
    if (totalGames === 0) {
      return '';
    } else {
      return `${Math.round((wins / totalGames) * 100)}% WR`;
    }
  };

  return (
    <div className='flex flex-col'>
      <div className={`p-1.5 rounded-t-lg 
        border-slate-950 border-x-1.5 border-t-1.5 ${!queueData && 'rounded-b-lg border-b-1.5'} bg-slate-900`}
      >
        <div className='flex justify-between px-1 text-sm text-zinc-300/95'>
          <span>{queueName}</span>
          {!queueData && <span className='text-zinc-400/90'>Unranked</span>}
        </div>
      </div>
      {queueData && (
        <div className='flex py-0.5 px-1.5 
          rounded-b-lg border-t border-t-zinc-500 border-slate-950 border-x-1.5 border-b-1.5 bg-slate-900'
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_S3_URL}/rank-crests/${queueData.tier}.png`} 
            alt=''
            className='size-14' 
            width={56} height={56}
          />
          <div className='flex flex-col justify-center ml-2.5'>
            <div className='text-base text-zinc-300 tracking-wide'>
              {`${queueData.tier.charAt(0)}${queueData.tier.slice(1).toLowerCase()} 
                ${getRankByTier(queueData.tier, queueData.rank)}`
              }
            </div>
            <div className='text-sm text-zinc-300/90'>
              {`${queueData.leaguePoints} LP`}
            </div>
          </div>
          <div className='flex flex-col justify-center ml-auto mt-0.5 mr-0.5 text-right text-sm text-zinc-400'>
            {`${queueData.win}W ${queueData.loss}L`}
            <span>{calculateWinrate(queueData.win, queueData.loss)}</span>
          </div>
        </div>
      )}
    </div>
  )
};