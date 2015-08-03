module Main where

import Prelude
import Node.ReadLine
import Control.Monad.Eff
import Control.Monad.Eff.Console
import Control.Monad.Eff.Random
import Unsafe.Coerce

foreign import closeInterface 
  :: forall eff. Interface -> Eff (console :: CONSOLE | eff) Interface

main = do
  interface <- createInterface noCompletion
  secret_number <- randomInt 1 100

  prompt interface
  flip setLineHandler interface $ \guess -> do
      log $ "You typed: " ++ guess
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
