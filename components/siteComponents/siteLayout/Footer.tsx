"use client";

import Image from 'next/image'
import React from 'react'

function Footer() {
    return (
        <>
          <section className="row mb-3">
                <div className="col_16 card">
                    <h1 className="font-semibold">Bienvenue sur Zangochap</h1>
                    <p>
                        sommes fiers de vous offrir une sélection variée de vêtements pour hommes et femmes ainsi que des accessoires de mode tendance. Nous comprenons l&apos importance de se sentir bien dans ses vêtements et c&apos est pourquoi nous avons sélectionné soigneusement les produits les plus actuels et les plus abordables pour vous.

                        Chez Zangochap, nous sommes déterminés à vous offrir une expérience de shopping en ligne facile et agréable.</p>

                    <p>Nous savons que les acheteurs en ligne sont à la recherche de rapidité et de fiabilité, c&apos; est pourquoi nous nous engageons à vous offrir une livraison rapide et fiable. </p>

                    <p> Vous n&apos; aurez plus à vous soucier de devoir attendre des semaines pour recevoir votre commande, chez Zangochap, nous garantissons une livraison dans les délais impartis.</p>

                    <p>Notre site est conçu pour être facile à naviguer, ce qui vous permet de trouver facilement les articles que vous recherchez.</p>

                    <p>Vous pouvez trier notre sélection en fonction de vos préférences de style, de taille ou de couleur, ce qui vous permet de trouver rapidement et facilement ce que vous cherchez. Nous offrons également des filtres de recherche avancés pour vous aider à trouver exactement ce que vous voulez.

                        Chez Zangochap, nous sommes également fiers de vous offrir des prix compétitifs et des offres exclusives. Nous savons que les acheteurs en ligne cherchent des bonnes affaires, et c&apos; est pourquoi nous avons travaillé dur pour vous offrir les meilleurs prix possible. Nous proposons régulièrement des ventes en ligne et des offres spéciales, alors assurez-vous de vérifier régulièrement notre site pour ne pas manquer les dernières offres.

                        Enfin, nous sommes là pour vous aider. Si vous avez des questions ou des préoccupations, notre équipe de service à la clientèle est là pour vous aider. Nous sommes disponibles pour répondre à vos questions par e-mail ou par téléphone, et nous nous engageons à vous fournir une réponse rapide et efficace.

                        Alors, que vous soyez à la recherche d&apos; articles de mode pour vous-même ou pour offrir en cadeau, Zangochap est l&apos; endroit idéal pour trouver ce que vous cherchez. Parcourez notre sélection en ligne dès maintenant et découvrez la mode abordable et de qualité que nous avons à offrir. Nous sommes toujours à la recherche de nouveaux produits pour vous offrir la plus grande sélection possible, alors assurez-vous de vérifier régulièrement notre site pour découvrir les dernières tendances.

                        En achetant chez Zangochap, vous pouvez être sûr d&apos; obtenir des produits de qualité à des prix abordables. Nous sommes déterminés à vous offrir une expérience de shopping en ligne agréable et facile, avec une livraison rapide et fiable. Nous sommes là pour vous aider à trouver les articles parfaits pour vous et votre style, et nous nous engageons à vous offrir le meilleur service possible.

                        Alors n&apos; hésitez plus, visitez notre site en ligne dès maintenant et découvrez pourquoi Zangochap est votre destination de shopping en ligne idéale. Commandez dès maintenant et soyez à la mode en un rien de temps
                    </p>
                </div>
            </section>
        <footer>
            <div className="row">
                <div className="col_4">
                    <div className="h-[65px] relative w-[250px]">
                        <Image fill sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw" src="/logo.webp" alt="image" />
                    </div>
                </div>
                <div className="col_8">
                    <h2 />
                </div>
                <div className="col_4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur recusandae ex accusamus quia quae, et ipsa nobis! Quibusdam mollitia, odit ipsam nobis voluptates similique. Hic earum molestiae adipisci vitae ea.
                </div>
            </div>
        </footer>
        </>
        
    )
}

export default Footer