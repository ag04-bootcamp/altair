import "./App.css";
import { Routes, Route } from "react-router-dom";

import Profile from "./components/profile/profile.component.tsx";
import Navigation from "./components/navigation/navigation.component.tsx";
import Container from "./components/container/container.component.tsx";
import Home from "./components/home/home.component.tsx";
import Footer from "./general-components/footer.component.tsx";
import LoginForm from "./components/login/login-form.component.tsx";
import SignUpForm from "./components/sign-up-form/sign-up-form.component.tsx";
import HealthRecord from "./components/health-record/health-record.component.tsx";
import Measurement from "./components/measurement/measurement.component.tsx";
import PreviousRecords from "./components/previous-records/previous-records.component.tsx";
import Files from "./components/files/files.component.tsx";
import PreviuosProfiles from "./components/profile/previous-profiles.component.tsx";
import AboutUs from "./components/about-us/about-us.component.tsx";
import UpdateProfile from "./components/update-profile/update-profile.component.tsx";
import ProductList from "./components/products/product-list.component.tsx";

import { useSelector } from "react-redux";

const App = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <div className="App">
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          {isLoggedIn && (
            <Route path="/measurement" element={<Measurement />} />
          )}
          {isLoggedIn && <Route exact path="/profile" element={<Profile />} />}
          {isLoggedIn && (
            <Route
              exact
              path="/previous-profiles"
              element={<PreviuosProfiles />}
            />
          )}
          {!isLoggedIn && <Route path="/login" element={<LoginForm />} />}
          {isLoggedIn && (
            <Route path="/update-profile" element={<UpdateProfile />} />
          )}
          {!isLoggedIn && <Route path="/sign-up" element={<SignUpForm />} />}
          {isLoggedIn && (
            <Route path="/health-record" element={<HealthRecord />} />
          )}
          {isLoggedIn && <Route path="/files/*" element={<Files />} />}
          {isLoggedIn && <Route path="/diets" element={<ProductList />} />}
          <Route path="/about-us" element={<AboutUs />} />
          {isLoggedIn && (
            <Route path="/all-records" element={<PreviousRecords />} />
          )}
        </Routes>
        <Footer />
      </Container>
    </div>
  );
};

export default App;
