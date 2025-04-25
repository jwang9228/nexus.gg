'use client'

import Summoner from '../../../../components/summoner/Summoner';
import { useParams } from 'next/navigation';

export default function Page() {
  const { region, summonerName } = useParams();

  return (
    <Summoner region={region} summonerName={summonerName} />
  )
}