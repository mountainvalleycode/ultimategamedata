export function navigate(url: string) {
  window.location.href = url;
}

export function characterLink(slugs: string[]): string {
  return `/character/?name=${slugs.join(',')}`;
}

export function stageLink(slug: string): string {
  return `/stage/?name=${slug}`;
}

export function matchupLink(slugs1: string[], slugs2: string[]): string {
  return `/matchup/?character1=${slugs1.join(',')}&character2=${slugs2.join(',')}`;
}

export function rankingsLink(): string {
  return `/rankings/`;
}
