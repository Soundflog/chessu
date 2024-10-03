import ArchivedGame from "@/components/archive/ArchivedGame";
import { fetchArchivedGame } from "@/lib/game";
import type { Game } from "@chessu/types";
import { notFound } from "next/navigation";
import { OPENGRAPH_SETTINGS } from "@/config";

export async function generateMetadata({ params }: { params: { id: number } }) {
  const game = (await fetchArchivedGame({ id: params.id })) as Game | undefined;
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
    description: `Archived game: ${game.white?.name} vs ${game.black?.name}`,
    openGraph: {
      title: OPENGRAPH_SETTINGS.title,
      description: `Archived game: ${game.white?.name} vs ${game.black?.name}`,
      url: OPENGRAPH_SETTINGS.url + `/archive/${game.id}`,
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

export default async function Archive({ params }: { params: { id: number } }) {
  const game = (await fetchArchivedGame({ id: params.id })) as Game | undefined;
  if (!game) {
    notFound();
  }

  return <ArchivedGame game={game} />;
}
