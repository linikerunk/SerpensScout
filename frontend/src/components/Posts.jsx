import React from 'react'
import PostCard from './PostCard'

const Posts = () => {
  const posts = [
    {
      id: 1,
      title: "Predizendo Resultados de Futebol com Modelagem Estatística: Dixon-Coles e Ponderação Temporal",
      description: "Este post descreve duas melhorias populares ao modelo Poisson padrão para previsões de futebol, coletivamente conhecidas como modelo Dixon-Coles.",
      readTime: "17 min de leitura"
    },
    {
      id: 2,
      title: "Analisando os Fatores que Influenciam os Preços das Criptomoedas com Cryptory",
      description: "Anunciando meu novo pacote Python com uma análise das forças envolvidas nos preços das criptomoedas.",
      readTime: "15 min de leitura"
    },
    {
      id: 3,
      title: "Vantagem de Casa em Ligas de Futebol ao Redor do Mundo",
      description: "Este post investiga a vantagem de casa universalmente conhecida mas pouco compreendida e como ela varia nas ligas de futebol ao redor do mundo.",
      readTime: "19 min de leitura"
    },
    {
      id: 4,
      title: "Mapeando a Ascensão das Colaborações Musicais com Scrapy e Pandas",
      description: "Fazendo uma pausa do deep learning, este post explora o recente aumento nas colaborações musicais nas paradas pop.",
      readTime: "9 min de leitura"
    },
    {
      id: 5,
      title: "Predizendo Preços de Criptomoedas com Deep Learning",
      description: "Este post une criptos e deep learning em uma tentativa desesperada de popularidade no Reddit.",
      readTime: "15 min de leitura"
    }
  ]

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-scout-900 mb-12 text-center">Posts Recentes</h3>
        
        <div className="space-y-8">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-12 space-x-2">
          <button className="btn-secondary">Anterior</button>
          <button className="btn-primary">1</button>
          <button className="btn-secondary">2</button>
          <button className="btn-secondary">3</button>
          <button className="btn-secondary">Próximo</button>
        </div>
      </div>
    </section>
  )
}

export default Posts
