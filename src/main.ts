type Person ={
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year ?: number,
  biography: string,
  image: string
}

type ActressNationality = 
| 'American' 
| 'British' 
| 'Australian'
| 'Israeli-American' 
| 'South African' 
| 'French' 
| 'Indian' 
| 'Israeli' 
| 'Spanish' 
| 'South Korean' 
| 'Chinese'

type Actress = Person & {
  most_famous_movies : [string, string, string]
  awards: string,
  nationality : ActressNationality
}

function isActress(user:  unknown) : user is Actress{
  return (
    typeof user ==='object' && user !== null &&
    "id" in user && typeof user.id === 'number' &&
    "name" in user && typeof user.name === 'string' &&
    "birth_year" in user && typeof user.birth_year === 'number' &&
    "biography" in user && typeof user.biography === 'string' &&
    "image" in user && typeof user.image === 'string' &&
    "most_famous_movies" in user && 
    user.most_famous_movies instanceof Array &&
    user.most_famous_movies.length === 3 &&
    user.most_famous_movies.every(m => typeof m === 'string') &&
    "awards" in user && typeof user.awards === 'string' &&
    "nationality" in user && typeof user.nationality === 'string'
  ) 
} 

async function getAccress(id: number): Promise<Actress | null>{
  try {
    const response =  await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`)
    const dataJson : unknown = await response.json()
    if (!isActress(dataJson)) {
      throw new Error(`Errore nella richiesta HTTP`);
    }
    return dataJson;

  } catch (error) {
    if (error instanceof Error){
      console.error('Errore durante il recuper dell\'attrice:', error);
    }
    else {
      console.error('Errore sconosciuto:',error);
    }
    return null
  }
}

async function getAllActresses (): Promise<Actress[]>{
  try {
    const response =  await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses`)
    if (!response.ok) {
      throw new Error(`Errore nella richiesta HTTP ${response.status}`);
    }
    const dataJson : unknown = await response.json()
    if (!Array.isArray(dataJson)) {
      throw new Error(`Formato dei dati non valido non è un array`);
    }
    const attriciValide: Actress[] = dataJson.filter(d => isActress(d))
    return attriciValide
  } catch (error) {
    if (error instanceof Error){
      console.error('Errore durante il recuper dell\'attrice:', error);
    }
    else {
      console.error('Errore sconosciuto:',error);
    }
    return []
  }
}

async function getActresses (ids: number[]): Promise<(Actress | null)[]> {

  try {
    const allIds = ids.map((id) => getAccress(id))
    return await Promise.all(allIds)

  } catch (error) {
    if (error instanceof Error){
      console.error('Errore durante il recuper dell\'attrice:', error);
    }
    else {
      console.error('Errore sconosciuto:',error);
    }
    return []
  }
}

function createActress(data: Omit<Actress, 'id'>): Actress{
  return {
    ...data,
    id: Math.floor(Math.random() * 10000)
  }
}

function updateActress(actress: Actress, updates: Partial< Omit<Actress, 'id'|'name'>>){
  return {
    ...actress,
    ...updates,
  }
}