

type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: 'American' | 'British' | 'Australian' | 'Israeli-American' | 'South African' | 'French' | 'Indian' | 'Israeli' | 'Spanish' | 'South Korean' | 'Chinese'
}

/* 📌 Milestone 3
Crea una funzione getActress che, dato un id, effettua una chiamata a:

GET https://boolean-spec-frontend.vercel.app/freetestapi/actresses/:id
La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta.

 */
function isActress(dati: unknown): dati is Actress {
  if (
    dati &&
    typeof dati === 'object' &&
    'id' in dati &&
    typeof dati.id === 'number' &&
    'name' in dati &&
    typeof dati.name === 'string' &&
    'birth_year' in dati &&
    typeof dati.birth_year === 'number' &&
    (!('death_year' in dati) || typeof dati.death_year === 'number') &&
    'biography' in dati &&
    typeof dati.biography === 'string' &&
    'image' in dati &&
    typeof dati.image === 'string' &&
    'most_famous_movies' in dati &&
    Array.isArray(dati.most_famous_movies) &&
    dati.most_famous_movies.length === 3 &&
    dati.most_famous_movies.every(movie => typeof movie === 'string') &&
    'awards' in dati &&
    typeof dati.awards === 'string' &&
    'nationality' in dati &&
    typeof dati.nationality === 'string' &&
    [
      'American',
      'British',
      'Australian',
      'Israeli-American',
      'South African',
      'French',
      'Indian',
      'Israeli',
      'Spanish',
      'South Korean',
      'Chinese'
    ].includes(dati.nationality)
  ) {
    return true;
  }

  return false;
}


async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/:${id}`)
    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status} : ${response.statusText}`)
    }
    const dati = await response.json()
    if (!isActress(dati)) {
      throw new Error("Formato dei dati non validi");
    }
    return dati;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante il recupero dei dati: ", error.message)
    } else {
      console.error("errore sconosciuto: ", error);
    }
    return null
  }
}