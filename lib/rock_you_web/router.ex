defmodule RockYouWeb.Router do
  use RockYouWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", RockYouWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/playme", PageController, :playme
  end

end
