import './Cards.css'
import Card from '../Card/Card';

export default function Cards({ dogs }) {
   return (
      <div className='cardsDiv' >
         {dogs.map((dog) => (
            <Card
               key={dog.id}
               id={dog.id}
               name={dog.name}
               bredFor={dog.bredFor}
               breedGroup={dog.breedGroup}
               lifeSpan={dog.lifeSpanString}
               temperament={dog.temperament}
               origin={dog.origin}
               metricWeight={dog.metricWeightString}
               imperialWeight={dog.imperialWeightString}
               metricHeight={dog.metricHeightString}
               imperialHeight={dog.imperialHeightString}
               image={dog.image}
               source={dog.source}
            />
         ))}
      </div>
   )
}