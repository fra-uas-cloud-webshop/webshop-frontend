import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section with Carousel */}
      <Carousel className="carousel-container">
        <Carousel.Item>
          <img className="d-block w-100 fixed-image" src="https://i.ibb.co/KcpMPWMK/top-view-wi-fi-router-with-laptop-hand-holding-smartphone.jpg" alt="First slide" />
          <Carousel.Caption>
            <h3>Welcome to WebShop</h3>
            <p>Your one-stop shop for all your needs</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 fixed-image" src="https://i.ibb.co/rKgtzYsT/coding-man.jpg" alt="Second slide" />
          <Carousel.Caption>
            <h3>Quality Services</h3>
            <p>We offer the best services at unbeatable prices</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 fixed-image" src="https://i.ibb.co/RkxM1dfP/freepik-the-style-is-candid-image-photography-with-natural-50155.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Fast Delivery</h3>
            <p>Get your services delivered quickly and efficiently</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      
      {/* About Section */}
      <section className="container py-5 text-center">
        <h2 className="mb-4">About WebShop</h2>
        <p> 
        Welcome to WebShop, your ultimate destination for stylish, high-quality furniture. Whether you’re looking to revamp your living space, furnish your office, or add timeless pieces to your home, we’ve got you covered. Explore our carefully curated collection of modern, classic, and custom-made furniture designed to suit every taste and budget. Shop with confidence and transform your space today!
</p>
      </section>
    </div>
  );
};

export default Home;

/* Styles */
const styles = `
  .fixed-image {
    height: 400px;
    object-fit: cover;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    .fixed-image {
      height: 250px;
    }
  }
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
