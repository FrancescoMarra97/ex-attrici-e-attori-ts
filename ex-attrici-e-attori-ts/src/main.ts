

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
    const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`)
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
getActress(3)
  .then(result => {
    console.log(result)
  })


async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses`)
    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status} : ${response.statusText}`)
    }
    const data = await response.json()
    if (Array.isArray(data)) {
      const validActresses = data.filter(isActress)
      return validActresses
    } else {
      throw new Error("Risposta non è un array");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante il recupero dei dati: ", error.message)
    } else {
      console.error("errore sconosciuto: ", error);
    }
  }
  return []
}

getAllActresses().then(res => console.log(res))

/* Crea una funzione getActresses che riceve un array di numeri (gli id delle attrici).

Per ogni id nell’array, usa la funzione getActress che hai creato nella Milestone 3 per recuperare l’attrice corrispondente.

L'obiettivo è ottenere una lista di risultati in parallelo, quindi dovrai usare Promise.all.

La funzione deve restituire un array contenente elementi di tipo Actress oppure null */

async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
  try {
    const promises = ids.map(id => getActress(id))
    const actresses = await Promise.all(promises)
    return actresses
  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante il recupero dei dati: ", error.message)
    } else {
      console.error("errore sconosciuto: ", error);
    }
  }
  return []
}
getActresses([10]).then(res => console.log(res))
