export const dogsPerPageOptions = {
  title: 'Dogs Per Page',
  options: ['8', '16', '24', '32', '64', 'All'],
  default: '8'
}

export const orderByOptions = {
  title: 'Order By',
  options: ['Name', 'Minimum Life Span', 'Maximum Life Span', 'Minimum Weight', 'Maximum Weight', 'Minimum Height' , 'Maximum Height'],
  default: 'Name'
}
export const filterOptions = {
  labels: ['Life Span', 'Weight', 'Height'],
  minIds: ['filterMinLifeSpan', 'filterMinWeight', 'filterMinHeight'],
  maxIds: ['filterMaxLifeSpan', 'filterMaxWeight', 'filterMaxHeight'],
  clearIds: ['clearLifeSpan', 'clearWeight', 'clearHeight'],
  minPlaceholder: 'From',
  maxPlaceholder: 'To'
}
export const sourceOptions = {
  title: 'Source',
  options: ['API', 'User'],
  ids: ['apiSource', 'userSource']
}