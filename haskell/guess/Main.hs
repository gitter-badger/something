module Main where

{- This is just a direct translation of the rust version. As such, a few things
   should be noted:

   - while there is string interpolation (via C-like printf), string
     concatenation in this instance was far simpler
   - since the rust version used a single function with impure operations, so
     did I; ideally, I'd have used the pure version of randomRIO, had a pure
     function for the comparison, and had main be the only place where IO
     happens
   - by using the Control.Monad module, I thiknk I could have reduced the
     number of lines andd redundant explicit calls to loop, but I didn't want
     to scare anyone off with the M word.
-}

import System.Random (randomRIO)
import Data.Ord (Ordering(..), compare)

main :: IO ()
main = do 
    secret_number <- randomRIO (1, 100) 
    putStrLn "Guess the number!"
    loop (secret_number :: Int)
  where
    loop number = do 
        putStrLn "Please input your guess."
        guess <- getLine
        putStrLn $ "You guessed: " ++ guess
        case read guess `compare` number of
          LT -> putStrLn "Too small!" >> loop number
          GT -> putStrLn "Too big!" >> loop number
          EQ -> do
              putStrLn "You win!"
              return ()
