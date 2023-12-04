import "./LandingPage.css";

import { useState, useEffect, useRef } from "react";

import { HeaderTemplate } from "../../templates/HeaderTemplate";
import topCover from "../../assets/landing-page-image.jpg";
import italianCuisineCover from "../../assets/italianCuisineCover.jpg";
import chineseCuisineCover from "../../assets/chineseCuisineCover.jpg";
import mexicanCuisineCover from "../../assets/mexicanCuisineCover.jpg";
import indianCuisineCover from "../../assets/indianCuisineCover.jpg";
import japaneseCuisineCover from "../../assets/japaneseCuisineCover.jpg";
import frenchCuisineCover from "../../assets/frenchCuisineCover.jpg";
import thaiCuisineCover from "../../assets/thaiCuisineCover.jpg";
import greekCuisineCover from "../../assets/greekCuisineCover.jpg";
import spanishCuisineCover from "../../assets/spanishCuisineCover.jpg";
import brazilianCuisineCover from "../../assets/brazilianCuisineCover.jpg";
import middleEasternCuisineCover from "../../assets/middleEasternCuisineCover.jpg";
import vietnameseCuisineCover from "../../assets/vietnameseCuisineCover.jpg";
import koreanCuisineCover from "../../assets/koreanCuisineCover.jpg";
import africanCuisineCover from "../../assets/africanCuisineCover.jpg";
import mediterraneanCuisineCover from "../../assets/mediterraneanCuisineCover.jpg";

import {
  FacebookLogo,
  InstagramLogo,
  Plus,
  Trophy,
  TwitterLogo,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Recipe } from "../../interfaces/RecipeInterface";
import { useToast } from "@chakra-ui/react";
import { getRecipes, getImage } from "../../api/recipe/recipe.service";
import { useAuth } from "../../context/AuthContext";
import {getPerson} from "../../api/person/person.service";

const cuisineImages = [
  {
    cover: italianCuisineCover,
    label: "Italian",
  },
  {
    cover: chineseCuisineCover,
    label: "Chinese",
  },
  {
    cover: mexicanCuisineCover,
    label: "Mexican",
  },
  {
    cover: indianCuisineCover,
    label: "Indian",
  },
  // {
  //   cover: japaneseCuisineCover,
  //   label: "Japanese",
  // },
  // {
  //   cover: frenchCuisineCover,
  //   label: "French",
  // },
  // {
  //   cover: thaiCuisineCover,
  //   label: "Thai",
  // },
  // {
  //   cover: greekCuisineCover,
  //   label: "Greek",
  // },
  // {
  //   cover: spanishCuisineCover,
  //   label: "Spanish",
  // },
  // {
  //   cover: brazilianCuisineCover,
  //   label: "Brazilian",
  // },
  // {
  //   cover: middleEasternCuisineCover,
  //   label: "Middle Eastern",
  // },
  // {
  //   cover: vietnameseCuisineCover,
  //   label: "Vietnamese",
  // },
  // {
  //   cover: koreanCuisineCover,
  //   label: "Korean",
  // },
  // {
  //   cover: africanCuisineCover,
  //   label: "African",
  // },
  // {
  //   cover: mediterraneanCuisineCover,
  //   label: "Mediterranean",
  // },
];

export function LandingPage() {
  const carousel = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeImages, setRecipeImages] = useState<any[]>([]);
  const toast = useToast();
  const { auth } = useAuth();

  const fetchRecipes = () => {
    // @ts-ignore
    getRecipes().then((data) => {
      // @ts-ignore
      const lastSixRecipes = data.slice(-6);
      setRecipes(lastSixRecipes);
    });
  };

  useEffect(() => {
    // @ts-ignore
    setCarouselWidth(
      carousel.current?.scrollWidth - carousel.current?.offsetWidth
    );
    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchRecipeImages = async () => {
      if (recipes) {
        const imageLinks = await Promise.all(
          recipes.map(async (recipe) => {
            const createdBy = await getPerson(recipe?.userId);
            const imageData = await getImage(recipe.image);
            const imageUrl = URL.createObjectURL(imageData);
            return {
              cover: imageUrl,
              label: recipe.title,
              category: recipe.type,
              creator: createdBy.firstName + " " + createdBy.lastName,
              id: recipe.id,
            };
          })
        );
        setRecipeImages(imageLinks);
      }
    };

    fetchRecipeImages();
  }, [recipes]);

  return (
    <HeaderTemplate>
      <div className="h-full">
        <div className="relative flex items-center w-full justify-center">
          <div className="relative flex items-center w-full justify-center flex-col mb-12">
            <img
              src={topCover}
              alt=""
              className="w-full h-[500px] object-cover object-top object-bottom"
            />
            <div className="absolute inset-0 z-10 after:z-20 bg-gradient-to-b from-transparent to-white mt-[150px]"></div>
          </div>
        </div>
        <div className="animated-title">
          <div className="text-top">
            <div>
              <span>TASTE</span>
              <span>EXPLORER</span>
            </div>
          </div>
          <div className="text-bottom">
            <div>Um mundo de receitas</div>
          </div>
        </div>
        <div className="flex items-center w-full justify-center flex-col">
          <strong className="text-gray-500 text-base">
            De delícias da culinária até os favoritos da família
          </strong>
          <div className="grid place-items-center">
            <h5 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300">
              Mergulhe na Cozinha
            </h5>
          </div>

          <Link to="/about-us">
            <button
              type="button"
              className="text-white bg-gray-900 p-2 mt-8 w-[120px] rounded-3xl text-base"
            >
              Saiba mais
            </button>
          </Link>
        </div>

        <div className="flex items-center w-full justify-center flex-col mt-12">
          <strong className="text-zinc-500 text-base flex items-center">
            RECÉM ADICIONADOS
            <Plus size={24} className="ml-2" />
          </strong>
        </div>
        <div className="flex items-center w-full justify-center">
          <div className="grid grid-cols-6 grid-flow-row mt-4 w-[58%] mb-4">
            {recipeImages.map((recipe, index) => (
              <div key={index} className="max-w-[140px] ml-2 mr-2">
                <div
                  className="w-full h-[200px] flex justify-center items-end p-4 cursor-pointer bg-[#f8f8f8] shadow-md shadow-zinc-400 hover:shadow-zinc-500 transition-all"
                  style={{
                    backgroundImage: `url(${recipe.cover})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="flex flex-col space-y-1">
                    <button className="w-full h-10 inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md overflow-hidden">
                      {recipe.id && (
                        <Link
                          to={`/recipe/${recipe.id}/visualize`}
                          className="text-center flex flex-col items-center"
                        >
                          <div className="text-xs overflow-hidden whitespace-nowrap max-w-full truncate">
                            Visualize
                          </div>
                        </Link>
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-1 flex flex-col">
                  <strong className="text-base text-blue-500">
                    {recipe?.label}
                  </strong>
                  <span className="text-sm text-zinc-500">{recipe?.category}</span>
                  <span className="text-sm text-zinc-500">{recipe.creator}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center w-full justify-center flex-col mt-8">
          <strong className="text-gray-500 text-base flex items-center">
            COZINHAS
            <Trophy size={24} className="ml-2" />
          </strong>
        </div>

        <motion.div
          ref={carousel}
          className="flex items-center w-full justify-center"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            className="mt-6 mb-16 flex items-center justify-center w-full gap-3 max-w-5xl items-center"
            drag="x"
            dragConstraints={{ left: 0, right: carouselWidth }}
          >
            {cuisineImages.map((category) => (
              <motion.div
                key={category.label}
                className="w-full h-[500px] rounded flex items-end justify-center p-4 cursor-grab rounded-xl overflow-hidden"
                style={{
                  backgroundImage: `url(${category.cover})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              >
                <Link
                  to={`/recipes/${category.label.toLowerCase()}`}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 focus:border-blue-700"
                >
                  {category.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="w-full h-64 flex justify-center items-center bg-blue-500">
          <div className="w-[65%] justify-between flex p-4">
            <div className="flex flex-col max-w-[295px]">
              <strong className="mb-1 text-white">Sobre Taste Explorer</strong>
              <hr />
              <div className="flex text-white text-sm mt-1">
                Taste Explorer é a sua solução ideal para gerenciamento de
                despensa e descoberta de receitas. Nossa plataforma foi
                projetada para agilizar sua experiência culinária. Você pode
                organizar sua despensa sem esforço, explorar receitas deliciosas
                e conectar-se com uma comunidade culinária vibrante.
              </div>
            </div>

            <div className="flex flex-col">
              <strong className="mb-1 text-white">Mais</strong>
              <hr />
              <Link to="/find-nearby-markets">
                <button type="button" className="flex text-white text-sm mt-1">
                  Mercados Próximos
                </button>
              </Link>
              <button
                type="button"
                className="flex text-white text-sm"
                onClick={() =>
                  (window.location.href = "mailto:contact@tasteexplorer.com")
                }
              >
                Contate-nos
              </button>
              <Link to="/about-us">
                <button type="button" className="flex text-white text-sm">
                  Sobre Nós
                </button>
              </Link>
              <Link to="/faq">
                <button type="button" className="flex text-white text-sm">
                  FAQ
                </button>
              </Link>
              <Link to="/terms-and-conditions">
                <button type="button" className="flex text-white text-sm">
                  Termos & Condições
                </button>
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <strong className="mb-2 text-white">Redes Sociais</strong>
              <div className="flex">
                <Link
                  to="https://www.facebook.com"
                  className="bg-white p-1 rounded-full cursor-pointer transition-all hover:bg-zinc-300"
                >
                  <FacebookLogo size={20} color="#272727" />
                </Link>
                <Link
                  to="https://www.instagram.com"
                  className="bg-white p-1 rounded-full cursor-pointer transition-all hover:bg-zinc-300 ml-2"
                >
                  <InstagramLogo size={20} color="#272727" />
                </Link>
                <Link
                  to="https://www.twitter.com"
                  className="bg-white p-1 rounded-full cursor-pointer transition-all hover:bg-zinc-300 ml-2"
                >
                  <TwitterLogo size={20} color="#272727" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderTemplate>
  );
}
