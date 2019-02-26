defmodule RockYouWeb.PageController do
  use RockYouWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def playme(conn, _params) do
    render(conn, "playme.html")
  end

end
