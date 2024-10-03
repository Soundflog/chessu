import GameAuthWrapper from "@/components/game/GameAuthWrapper";
import { fetchActiveGame } from "@/lib/game";
import { notFound } from "next/navigation";
import { OPENGRAPH_SETTINGS } from "@/config";

export async function generateMetadata({ params }: { params: { code: string } }) {
  const game = await fetchActiveGame(params.code);
  if (!game) {
    return {
      description: "Game not found",
      robots: {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true
      }
    };
  }
  return {
    description: `Play or watch a game with ${game.host?.name}`,
    openGraph: {
      title: OPENGRAPH_SETTINGS.title,
      description: `Play or watch a game with ${game.host?.name}`,
      url: OPENGRAPH_SETTINGS.url + `/${game.code}`,
      siteName: OPENGRAPH_SETTINGS.site_name,
      locale: OPENGRAPH_SETTINGS.locale,
      type: "website"
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      noarchive: true
    }
  };
}

export default async function Game({ params }: { params: { code: string } }) {
  const game = await fetchActiveGame(params.code);
  if (!game) {
    notFound();
  }

  return <GameAuthWrapper initialLobby={game} />;
}
