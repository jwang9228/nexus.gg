'use client'

import ChampionData from '../../../../components/champion/ChampionData';
import { useParams } from 'next/navigation';

export default function Page() {
  const { championName } = useParams();

  return (
    <ChampionData championName={championName} />
  )
}