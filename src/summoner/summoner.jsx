import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as summonerClient from './summoner-client';
import SummonerSkeleton from './summoner-skeleton';
import SummonerData from './summoner-data/summoner-data';

function Summoner() {
	const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const { region, summonerName } = useParams();
  const [gameName, tagline] = summonerName.split('-');
  const [summonerData, setSummonerData] = useState();
  const [fetchingData, setFetchingData] = useState();
  const [matches, setMatches] = useState();
  const matchCount = 20;

  const getWinrateDataByQueue = (queueType, winrateData) => {
		const queueTypeMapping = {
			'solo': 'RANKED_SOLO_5x5',
			'flex': 'RANKED_FLEX_SR'
		};
		const queueData = winrateData.find(data => data.queueType === queueTypeMapping[queueType]);
		return queueData && {
			win: queueData.wins,
			loss: queueData.losses,
			tier: queueData.tier,
			rank: queueData.rank,
			leaguePoints: queueData.leaguePoints,
		};
	};

  const getRiotSummonerData = async () => {
		const data = await summonerClient.getSummonerData(region, summonerName);
		if (data) {
			const matchIDs = await summonerClient.getMatchesByPUUID(region, data.puuid, matchCount);
			const winrateData = await summonerClient.getWinrateData(region, data.id);
			return {
				summonerName: data.gameName,
				tagLine: data.tagLine,
				summonerLevel: data.summonerLevel,
				summonerId: data.id,
				profileIconId: data.profileIconId,
				puuid: data.puuid,
				server: region,
				matchIDs: matchIDs,
				soloQueueRank: getWinrateDataByQueue('solo', winrateData),
				flexQueueRank: getWinrateDataByQueue('flex', winrateData),
			}
		};
		return undefined;
	};

  const getMatches = async (matchIDs) => {
		const matchesData = [];
		for (const matchID of matchIDs) {
			const match = await summonerClient.getMatchData(region, matchID);
			matchesData.push(match);
		}
		setMatches(matchesData);
	};
  
  useEffect(() => {
    const fetchData = async () => {
			setSummonerData(undefined);
			setFetchingData(true);
			let response = await summonerClient.findSummonerByRegion(region, summonerName);
			if (!response) {
				const riotSummonerData = await getRiotSummonerData();
				if (riotSummonerData) {
					await summonerClient.createSummoner(riotSummonerData);
					response = riotSummonerData;
				}
			}
      if (response) { 
        const searchData = {
          name: `${response.summonerName}`,
					tagline: tagline,
          region: region,
          profileIconId: response.profileIconId,
        };
        await summonerClient.addRecentSearch(searchData);
        await getMatches(response.matchIDs);
        setSummonerData(response);
      }
			setFetchingData(false);
		};
		fetchData();
  }, []);

  return (
		<div className='flex h-dvh shadow-[inset_0_0_0_2000px_rgba(0,0,0,0.25)]'>
			<div 
				style={{'--bg-image-url': `url(${AWS_S3_URL}/general/summoners-rift.jpeg)`}}
				className='bg-cover bg-center bg-[image:var(--bg-image-url)] z-[-1] absolute top-0 left-0 size-full'
			/>
				{summonerData ? (
						<SummonerData summonerData={summonerData}/>
					) : fetchingData ? (
						<SummonerSkeleton />
					) : (
					<div className='ml-24 mr-16 text-white'>
						data not found
					</div>
				)}
		</div>
  );
} 
export default Summoner;
