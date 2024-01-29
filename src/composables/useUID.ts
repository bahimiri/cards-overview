interface UseUID {
  generateId(): string;
}

let id = 1

export default function(): UseUID {
  const generateId = () => {
    const uuid = id++
    return `${ uuid }`
  }

  return {
    generateId,
  }
}