export const fetchMoreItems = async (page: number) => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 10 }, (_, i) => `Item ${i + 1 + (page - 1) * 10}`),
      )
    }, 1000)
  })
}
