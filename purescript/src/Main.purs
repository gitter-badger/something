module Main where

import Prelude (($), (++), flip, bind, compare, Ordering(..))
import Node.ReadLine (Interface(..), 
                      createInterface, noCompletion, prompt, setLineHandler)
import Control.Monad.Eff (Eff(..))
import Control.Monad.Eff.Console (CONSOLE(..), log)
import Control.Monad.Eff.Random (randomInt)
import Unsafe.Coerce (unsafeCoerce)

foreign import closeInterface 
  :: forall eff. Interface -> Eff (console :: CONSOLE | eff) Interface

main = do
  interface <- createInterface noCompletion
  secret_number <- randomInt 1 100
  log "Guess the number!"

  log "Please input your guess."
  prompt interface
  flip setLineHandler interface $ \guess -> do
      log $ "You guessed: " ++ guess
      case unsafeCoerce guess `compare` secret_number of
        LT -> do
          log "Too small!"
          prompt interface
        GT -> do
          log "Too big!"
          prompt interface
        EQ -> do
          log "You win!"
          closeInterface interface
