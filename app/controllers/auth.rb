get '/login' do
  erb :'auth/login'
end

post '/login' do
  user = User.find_by(name: params[:user][:name]).try(:authenticate, params[:user][:password])

  if user
    session[:user_id] = user.id
    redirect("/")
  else
    set_error("Username not found or password incorrect.")
    redirect("/login")
  end
end

get '/signup' do
  erb :'auth/signup'
end

get '/logout' do
  session[:user_id] = nil
  redirect("/")
end

post '/signup' do
  user = User.new(params[:user])
  if user.save
    session[:user_id] = user.id
    redirect("/")
  else
    session[:error] = user.errors.messages 
    redirect("/signup")
  end
end