type Person ={
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year ?: number,
  biography: string,
  image: string
}

type Actress = Person & {
  most_famous_movies : [string, string, string]
  awards: string,
  nationality : 'American' | 'British' | 'Australian' | 'Israeli-American' | 'South African' | 'French' | 'Indian' | 'Israeli' | 'Spanish' | 'South Korean' | 'Chinese'
}

function isActress<Actress>(user:  Actress){
  if (user && 
    typeof user ==='object' &&
    "id" in user && 
    typeof user.id === 'number' &&
    "name" in user && 
    typeof user.name === 'string' &&
    "birth_year" in user && 
    typeof user.birth_year === 'number' &&
    "biography" in user && 
    typeof user.biography === 'string' &&
    "image" in user && 
    typeof user.image === 'string' &&
    "most_famous_movies" in user && 
    Array.isArray(user.most_famous_movies) &&
    "awards" in user && 
    typeof user.awards === 'string' &&
    "nationality" in user && 
    typeof user.nationality === 'string'
  ) {
    return true
  }
  return false
}

async function getAccress(id: number){
  try {
    const response =  await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`)
    if (!response.ok) {
      throw new Error(`Errore nella richiesta HTTP`);
    }
  const dataJson : unknown = await response.json()
  if (isActress(dataJson)) {
    return dataJson
  }
  return null

  } catch (error) {
    console.error(error);
    
  }
}

async function getAllActresses (){
  try {
    const response =  await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses`)
    if (!response.ok) {
      throw new Error(`Errore nella richiesta HTTP`);
    }
    const dataJson : unknown = await response.json()
    if (Array.isArray(dataJson)) {
      console.log(dataJson);
      return dataJson
    }
  } catch (error) {
    console.error(error);
  }
}

async function getActresses (ids: number[]) {

  try {
    const allIds = ids.map(async (id) => {
      const response =  await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`)
      if (!response.ok) {
        return null
      }
      const dataJson : unknown = await response.json()
      if (isActress(dataJson)) {
        return dataJson
      }
    })
    console.log('Promis');
    return await Promise.allSettled(allIds).then(obj => console.log(obj))

  } catch (error) {
    console.error(error);
    
  }
}

let numeri: number[] = [...Array(50).keys()].map((i) => i + 1);
getActresses(numeri)