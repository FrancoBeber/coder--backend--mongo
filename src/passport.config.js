import passport from "passport";
import local from "passport-local";
import userModel from "./models/user.model.js";
import { createHash, isValidPassword } from "./util.js";
import GitHubStrategy from "passport-github2";
const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const result = await userModel.create(newUser);
          return done(null, result);
        } catch (err) {
          return done("Error al leer la Base de Datos...");
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            console.log("User doesnot exists");
            return done(null, user);
          }
          if (!isValidPassword(user, password)) return done(null, false);

          return done(null, user);
        } catch (err) {}
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.20d8f05bb6d14832",
        clientSecret: "8d06973dadcf2e35ffbd9e91726ff0bbedebde0f",
        callbackURL: "http://localhost:8080/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          const user = await userModel.findOne({ email: profile._json.email });
          if (user) {
            return done(null, user);
          }

          const newUser = await userModel.create({
            first_name: profile._json.name,
            email: profile._json.email,
          });

          return done(null, newUser);
        } catch (err) {
          return done("Error al ingresar con Github");
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
