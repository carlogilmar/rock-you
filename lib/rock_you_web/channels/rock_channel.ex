defmodule RockYouWeb.RockChannel do
  use Phoenix.Channel

  def join("rock:you", _msg, socket) do
    {:ok, %{}, socket}
  end
end
