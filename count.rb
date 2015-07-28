threads = []

10.times do
  threads << Thread.new do
    count = 0

    10000000.times do
      count += 1
    end
  end
end

threads.each {|t| t.join }
puts "done!"
