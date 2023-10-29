import './LandingPage.css';

import { useState, useEffect, useRef } from "react";

import { HeaderTemplate } from "../../templates/HeaderTemplate";
import romanceCover from "../../assets/romance-cover.jpg";
import thrillerCover from "../../assets/thriller-cover.jpg";
import scifiCover from "../../assets/scifi-cover.png";
import fantasyCover from "../../assets/fantasy-cover.jpg";
import topCover from "../../assets/landing-page-cover.jpg";
import book1 from "../../assets/book1.jpg";

import {
  FacebookLogo,
  InstagramLogo,
  Plus,
  ShoppingCart,
  Trophy,
  TwitterLogo,
} from "phosphor-react";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import {Book} from "../../interfaces/BookInterface";
import {useToast} from "@chakra-ui/react";
import {getBooks, getImage} from "../../api/book/book.service";
import {useAuth} from "../../context/AuthContext";
import {addToCart} from "../../api/cart/cart.service";

const categoryImages = [
  {
    cover: romanceCover,
    label: "Romance",
  },
  {
    cover: thrillerCover,
    label: "Thriller",
  },
  {
    cover: scifiCover,
    label: "Sci-fi",
  },
  {
    cover: fantasyCover,
    label: "Fantasy",
  },
];

export function LandingPage() {
  const carousel = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [bookImages, setBookImages] = useState<any[]>([]);
  const toast = useToast();
  const { auth } = useAuth();

  const fetchBooks = () => {
    // @ts-ignore
    getBooks().then((data) => {
      // @ts-ignore
      const lastSixBooks = (data).slice(-6);
      setBooks(lastSixBooks);
    });
  };

  useEffect(() => {
    // @ts-ignore
    setCarouselWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchBookImages = async () => {
      if (books) {
        const imageLinks = await Promise.all(
            books.map(async (book) => {
              const imageData = await getImage(book.image);
              const imageUrl = URL.createObjectURL(imageData);
              return {
                cover: imageUrl,
                label: book.title,
                category: book.type,
                price: book.price,
                id: book.id,
              };
            })
        );
        setBookImages(imageLinks);
      }
    };

    fetchBookImages();
  }, [books]);

  return (
      <HeaderTemplate>
        <div className="h-full">
          <div className="relative flex items-center w-full justify-center">
            <div className="relative flex items-center w-full justify-center flex-col mb-12">
              <img src={topCover} alt="" className="w-full h-[500px] object-cover object-top object-bottom" />
              <div className="absolute inset-0 z-10 after:z-20 bg-gradient-to-b from-transparent to-white mt-[150px]"></div>
            </div>
          </div>
          <div className="animated-title">
            <div className="text-top">
              <div>
                <span>BOOK</span>
                <span>VERSE</span>
              </div>
            </div>
            <div className="text-bottom">
              <div>A haven for book lovers</div>
            </div>
          </div>
          <div className="flex items-center w-full justify-center flex-col">
            <strong className="text-gray-500 text-base">
              From the bestsellers to the classics
            </strong>
            <div className="grid place-items-center">
              <h5 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300">
                Immerse Yourself
              </h5>
            </div>

            <Link to="/about-us">
              <button
                  type="button"
                  className="text-white bg-gray-900 p-2 mt-8 w-[120px] rounded-3xl text-base"
                >
                Learn More
              </button>
            </Link>
          </div>

          <div className="flex items-center w-full justify-center flex-col mt-12">
            <strong className="text-zinc-500 text-base flex items-center">
              RECENTLY ADDED
              <Plus size={24} className="ml-2" />
            </strong>
          </div>
          <div className="flex items-center w-full justify-center">
            <div className="grid grid-cols-6 grid-flow-row mt-4 w-[58%] mb-4">
              {bookImages.map((book, index) => (
                  <div key={index} className="max-w-[140px] ml-2 mr-2">
                    <div
                        className="w-full h-[200px] flex justify-center items-end p-4 cursor-pointer bg-[#f8f8f8] shadow-md shadow-zinc-400 hover:shadow-zinc-500 transition-all"
                        style={{
                          backgroundImage: `url(${book.cover})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                    >
                      <div className="flex flex-col space-y-1">
                        {auth.isAuthenticated && (
                            <button className="w-full h-10 inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md overflow-hidden"
                                    onClick={async () => {
                                      const res = await addToCart(auth.personId, book.id, 1);
                                      if (res !== null) {
                                        toast({
                                          title: "Book added to cart",
                                          status: "success",
                                          duration: 3000,
                                          isClosable: true,
                                        });
                                      } else {
                                        toast({
                                          title: "Error adding book to cart",
                                          status: "warning",
                                          duration: 3000,
                                          isClosable: true,
                                        });
                                      }
                                    }}>
                              {
                                  book.id && (
                                      <div className="text-center flex flex-col items-center">
                                        <ShoppingCart className="mr-2" size={18} />
                                        <div className="text-xs overflow-hidden whitespace-nowrap max-w-full truncate">
                                          Add to cart
                                        </div>
                                      </div>
                                  )
                              }
                            </button>
                        )}
                        <button className="w-full h-10 inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md overflow-hidden">
                          {
                              book.id && (
                                  <Link to={`/book/${book.id}/visualize`} className="text-center flex flex-col items-center">
                                    <div className="text-xs overflow-hidden whitespace-nowrap max-w-full truncate">
                                      Visualize
                                    </div>
                                  </Link>
                              )
                          }
                        </button>
                      </div>
                    </div>
                    <div className="p-1 flex flex-col">
                      <strong className="text-base text-blue-500">{book.label}</strong>
                      <span className="text-sm text-zinc-500">{book.category}</span>
                      <span>U$ {book.price}</span>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          <div className="flex items-center w-full justify-center flex-col mt-8">
            <strong className="text-gray-500 text-base flex items-center">
              CATEGORIES
              <Trophy size={24} className="ml-2" />
            </strong>
          </div>

          <motion.div ref={carousel} className="flex items-center w-full justify-center" whileTap={{ cursor: "grabbing" }}>
            <motion.div className="mt-6 mb-16 flex items-center justify-center w-full gap-3 max-w-5xl items-center"
                        drag="x"
                        dragConstraints={{ left: 0, right: carouselWidth }}
            >
              {categoryImages.map((category) => (
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
                        to={`/books/${category.label.toLowerCase()}`}
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
                <strong className="mb-1 text-white">About us</strong>
                <hr />
                <div className="flex text-white text-sm mt-1">Bookverse is a platform for selling books. We offer a wide selection of titles from all genres, and our easy-to-use interface makes it simple to find the books you're looking for.</div>
              </div>

              <div className="flex flex-col">
                <strong className="mb-1 text-white">More</strong>
                <hr />
                <Link to="/find-us">
                  <button
                      type="button"
                      className="flex text-white text-sm mt-1"
                  >
                    Find Us
                  </button>
                </Link>
                <button
                    type="button"
                    className="flex text-white text-sm"
                    onClick={() => window.location.href = 'mailto:contact@bookverse.com'}
                >
                  Contact us
                </button>
                <Link to="/about-us">
                  <button
                      type="button"
                      className="flex text-white text-sm"
                  >
                    About Us
                  </button>
                </Link>
                <Link to="/faq">
                  <button
                      type="button"
                      className="flex text-white text-sm"
                  >
                    FAQ
                  </button>
                </Link>
                <Link to="/terms-and-conditions">
                  <button
                      type="button"
                      className="flex text-white text-sm"
                  >
                    Terms & Conditions
                  </button>
                </Link>
              </div>

              <div className="flex flex-col items-center">
                <strong className="mb-2 text-white">Socials</strong>
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
