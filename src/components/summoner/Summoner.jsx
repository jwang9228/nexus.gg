import { useState, useEffect } from 'react';
import SummonerSkeleton from './SummonerSkeleton';
import SummonerData from './SummonerData';
import NoSummonerData from './NoSummonerData';
import regions from '../../metadata/regions.json';
import * as summonerClient from '../../client/summonerClient';

export default function Summoner({region, summonerName}) {
  const [gameName, tagline] = summonerName.split('-');
  const [summonerData, setSummonerData] = useState();
  const [fetchingData, setFetchingData] = useState(true);
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
		const riotApiRegion = regions.find(r => r.region === region).riotApiRegion;
		const data = await summonerClient.getSummonerData(riotApiRegion, summonerName);
		if (data) {
			const matchIDs = await summonerClient.getMatchesByPUUID(riotApiRegion, data.puuid, matchCount);
			const winrateData = await summonerClient.getWinrateData(riotApiRegion, data.id);
			return {
				summonerName: data.gameName,
				tagLine: data.tagLine,
				summonerLevel: data.summonerLevel,
				summonerId: data.id,
				profileIconId: data.profileIconId,
				puuid: data.puuid,
				server: riotApiRegion,
				matchIDs: matchIDs,
				soloQueueRank: getWinrateDataByQueue('solo', winrateData),
				flexQueueRank: getWinrateDataByQueue('flex', winrateData),
			}
		};
		return undefined;
	};

  const getMatches = async (matchIDs) => {
		const riotApiRegion = regions.find((r) => r.region === region).riotApiRegion;
		const matchesData = [];
		for (const matchID of matchIDs) {
			const match = await summonerClient.getMatchData(riotApiRegion, matchID);
			matchesData.push(match);
		}
		setMatches(matchesData);
	};

	const processSummonerData = async (summonerData) => {
		await getMatches(summonerData.matchIDs);
		setSummonerData(summonerData);
	};

	const updateSummoner = async () => {
		setFetchingData(true);
		setSummonerData(undefined);
		const updatedSummonerData = await getRiotSummonerData();
		await summonerClient.updateSummoner(updatedSummonerData);
		await processSummonerData(updatedSummonerData);
		setFetchingData(false);
	};
  
  useEffect(() => {
		const riotApiRegion = regions.find(r => r.region === region).riotApiRegion;
    const fetchData = async () => {
			setFetchingData(true);
			setSummonerData(undefined);
			let response = await summonerClient.findSummonerByRegion(riotApiRegion, summonerName);
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
        await processSummonerData(response);
      }
			setFetchingData(false);
		};
		fetchData();
  }, []);

  return (
		<>
			{summonerData 
				? (<SummonerData 
						summonerData={summonerData} 
						matches={matches} 
						updateSummoner={updateSummoner}
					/>) 
				: fetchingData 
					? <SummonerSkeleton />
					: <NoSummonerData searchName={gameName} tagline={tagline} />
			}
		</>
	);
};