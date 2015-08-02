module Paths_something (
    version,
    getBinDir, getLibDir, getDataDir, getLibexecDir,
    getDataFileName, getSysconfDir
  ) where

import qualified Control.Exception as Exception
import Data.Version (Version(..))
import System.Environment (getEnv)
import Prelude

catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
catchIO = Exception.catch

version :: Version
version = Version [0,1,0,0] []
bindir, libdir, datadir, libexecdir, sysconfdir :: FilePath

bindir     = "/home/edwin/projects/something/haskell/.stack-work/install/x86_64-linux/nightly-2015-07-30/7.10.2/bin"
libdir     = "/home/edwin/projects/something/haskell/.stack-work/install/x86_64-linux/nightly-2015-07-30/7.10.2/lib/x86_64-linux-ghc-7.10.2/something-0.1.0.0-CX7xA6Qdbx2G5aU656bULA"
datadir    = "/home/edwin/projects/something/haskell/.stack-work/install/x86_64-linux/nightly-2015-07-30/7.10.2/share/x86_64-linux-ghc-7.10.2/something-0.1.0.0"
libexecdir = "/home/edwin/.cabal/libexec"
sysconfdir = "/home/edwin/.cabal/etc"

getBinDir, getLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "something_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "something_libdir") (\_ -> return libdir)
getDataDir = catchIO (getEnv "something_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "something_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "something_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "/" ++ name)
