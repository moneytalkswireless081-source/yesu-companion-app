export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  participants: number;
  lessons: StudyLesson[];
  progress?: number;
}

export interface StudyLesson {
  id: string;
  day: number;
  title: string;
  scripture: string;
  content: string;
  questions: string[];
  prayer: string;
  completed?: boolean;
}

export const studyPlansDatabase: StudyPlan[] = [
  {
    id: 'walking-with-jesus',
    title: "Walking with Jesus",
    description: "A 30-day journey through the life and teachings of Christ",
    duration: 30,
    category: "Discipleship",
    difficulty: "Beginner",
    participants: 1250,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "The Call to Follow",
        scripture: "Matthew 4:18-22",
        content: "Jesus called ordinary fishermen to become His disciples. He calls us too, not because we're perfect, but because He has a purpose for our lives. The invitation to follow Jesus is not just for the 'qualified' but for anyone willing to trust and obey.",
        questions: [
          "What does it mean to 'follow' Jesus in your daily life?",
          "What might you need to 'leave behind' to follow Jesus more closely?",
          "How can you respond to Jesus' call today?"
        ],
        prayer: "Jesus, thank You for calling me to follow You. Help me to respond with the same willingness as the disciples. Show me what I need to leave behind and give me courage to follow You wholeheartedly. Amen."
      },
      {
        id: 'day-2',
        day: 2,
        title: "The Greatest Commandment",
        scripture: "Matthew 22:37-39",
        content: "Love for God and love for others - this is the foundation of Christian living. Everything else flows from these two commandments. When we truly love God with all our heart, soul, and mind, loving our neighbor becomes a natural outflow.",
        questions: [
          "How do you currently show love to God?",
          "Who in your life needs more of your love?",
          "What practical step can you take today to love someone better?"
        ],
        prayer: "Lord, fill my heart with love for You and for others. Help me to see people through Your eyes and to love them with Your love. Make me an instrument of Your love today. Amen."
      },
      {
        id: 'day-3',
        day: 3,
        title: "Jesus' Compassion",
        scripture: "Matthew 9:35-38",
        content: "Jesus saw the crowds and had compassion on them because they were harassed and helpless, like sheep without a shepherd. His heart breaks for the lost and hurting. As His followers, we're called to share in His compassion.",
        questions: [
          "When have you felt Jesus' compassion in your own life?",
          "Who around you needs compassion today?",
          "How can you be Jesus' hands and feet to show compassion?"
        ],
        prayer: "Compassionate Savior, give me Your heart for the lost and hurting. Help me to see people as You see them and respond with Your love and compassion. Use me to bring Your hope to others. Amen."
      },
      {
        id: 'day-4',
        day: 4,
        title: "The Beatitudes",
        scripture: "Matthew 5:3-12",
        content: "In the Beatitudes, Jesus describes the character of those in His kingdom. These are not rules to earn salvation, but descriptions of the transformed heart that follows Christ.",
        questions: [
          "Which beatitude speaks most to your current situation?",
          "How do these attitudes differ from what the world values?",
          "What would it look like to live out one of these beatitudes today?"
        ],
        prayer: "Jesus, transform my heart to reflect Your kingdom values. Help me to find my happiness and fulfillment in You alone. Make me a peacemaker, merciful, and pure in heart. Amen."
      },
      {
        id: 'day-5',
        day: 5,
        title: "Light of the World",
        scripture: "Matthew 5:14-16",
        content: "Jesus calls us the light of the world. Just as a city on a hill cannot be hidden, our lives should shine with His love and truth. We don't hide our light but let it shine for God's glory.",
        questions: [
          "How is your life shining Jesus' light to others?",
          "What might be dimming your light?",
          "In what specific ways can you let your light shine this week?"
        ],
        prayer: "Lord Jesus, You are the true Light. Help me to reflect Your light in all I do and say. Remove anything that dims my witness and help me shine brightly for Your glory. Amen."
      },
      {
        id: 'day-6',
        day: 6,
        title: "The Lord's Prayer",
        scripture: "Matthew 6:9-13",
        content: "Jesus taught His disciples how to pray, giving us a model that covers worship, submission, provision, forgiveness, and protection. This prayer teaches us God's priorities and our dependence on Him.",
        questions: [
          "What does 'hallowed be Your name' mean in your daily life?",
          "How can you seek God's kingdom first today?",
          "Who do you need to forgive as God has forgiven you?"
        ],
        prayer: "Our Father in heaven, hallowed be Your name. Your kingdom come, Your will be done on earth as it is in heaven. Give us today our daily bread and forgive us our debts as we forgive our debtors. Lead us not into temptation but deliver us from evil. For Yours is the kingdom and the power and the glory forever. Amen."
      },
      {
        id: 'day-7',
        day: 7,
        title: "Do Not Worry",
        scripture: "Matthew 6:25-34",
        content: "Jesus commands us not to worry about tomorrow because our heavenly Father knows what we need. Worry accomplishes nothing but robs us of peace and trust in God's provision.",
        questions: [
          "What are you currently worrying about?",
          "How have you seen God provide for you in the past?",
          "What would change if you truly believed God will take care of you?"
        ],
        prayer: "Heavenly Father, You know my needs before I ask. Help me to trust in Your provision and not worry about tomorrow. Give me peace and help me seek Your kingdom first. Amen."
      },
      {
        id: 'day-8',
        day: 8,
        title: "Ask, Seek, Knock",
        scripture: "Matthew 7:7-11",
        content: "God invites us to come to Him with our requests. He's a good Father who delights in giving good gifts to His children. Persistent prayer shows our dependence on Him.",
        questions: [
          "What have you been hesitant to ask God for?",
          "How has God answered your prayers in unexpected ways?",
          "What does it mean that God gives 'good gifts' to His children?"
        ],
        prayer: "Good Father, thank You for inviting me to come to You with my needs. Help me to pray persistently and trust in Your perfect timing and wisdom. Thank You for the good gifts You give. Amen."
      },
      {
        id: 'day-9',
        day: 9,
        title: "The Golden Rule",
        scripture: "Matthew 7:12",
        content: "Jesus summarizes how we should treat others: do to them what you would want them to do to you. This simple rule transforms relationships and reflects God's love.",
        questions: [
          "How would you want others to treat you in difficult times?",
          "Who in your life needs you to apply the Golden Rule?",
          "What would change in your relationships if you consistently lived this way?"
        ],
        prayer: "Jesus, help me to treat others the way I would want to be treated. Give me empathy and understanding. Help me to be patient, kind, and loving to everyone I encounter. Amen."
      },
      {
        id: 'day-10',
        day: 10,
        title: "Building on the Rock",
        scripture: "Matthew 7:24-27",
        content: "Jesus warns us about the foundation we build our lives on. Those who hear His words and put them into practice are like wise builders who build on solid rock.",
        questions: [
          "What foundation is your life currently built on?",
          "Which of Jesus' teachings do you find hardest to put into practice?",
          "How can you strengthen your spiritual foundation?"
        ],
        prayer: "Lord Jesus, I want to build my life on the solid foundation of Your words. Help me not just to hear Your teachings but to obey them. Make my faith strong and unshakeable. Amen."
      },
      {
        id: 'day-11',
        day: 11,
        title: "Come to Me",
        scripture: "Matthew 11:28-30",
        content: "Jesus invites all who are weary and burdened to come to Him for rest. His yoke is easy and His burden is light because He carries the weight with us.",
        questions: [
          "What burdens are you carrying that you need to give to Jesus?",
          "How have you experienced Jesus' rest in difficult times?",
          "What does it mean that Jesus' yoke is easy and His burden light?"
        ],
        prayer: "Jesus, I come to You with all my burdens and weariness. Thank You for the promise of rest. Teach me to take Your yoke upon me and learn from You. Give me Your peace. Amen."
      },
      {
        id: 'day-12',
        day: 12,
        title: "The Good Samaritan",
        scripture: "Luke 10:25-37",
        content: "Jesus redefines who our 'neighbor' is through the parable of the Good Samaritan. Love is not just feeling but action, especially toward those who are different from us.",
        questions: [
          "Who is your 'neighbor' that you might be overlooking?",
          "When have you experienced unexpected kindness from someone?",
          "How can you be a 'Good Samaritan' to someone this week?"
        ],
        prayer: "Merciful God, open my eyes to see the needs around me. Help me to love not just in word but in deed. Give me courage to help others, even when it's inconvenient. Amen."
      },
      {
        id: 'day-13',
        day: 13,
        title: "The Lost Son",
        scripture: "Luke 15:11-32",
        content: "The parable of the prodigal son shows God's incredible love and forgiveness. No matter how far we've strayed, our Father waits with open arms for our return.",
        questions: [
          "How have you experienced God's forgiveness in your own life?",
          "Are you more like the younger son or the older son in this story?",
          "Who in your life needs to experience God's forgiveness through you?"
        ],
        prayer: "Loving Father, thank You for Your amazing grace and forgiveness. Help me to run to You when I've strayed and to extend the same forgiveness to others. Fill my heart with Your love. Amen."
      },
      {
        id: 'day-14',
        day: 14,
        title: "The Good Shepherd",
        scripture: "John 10:11-16",
        content: "Jesus calls Himself the Good Shepherd who lays down His life for His sheep. Unlike hired hands, He cares deeply for each one of us and will never abandon us.",
        questions: [
          "How have you experienced Jesus as your Good Shepherd?",
          "What does it mean that Jesus knows His sheep by name?",
          "How does knowing Jesus as your Shepherd change how you face difficulties?"
        ],
        prayer: "Good Shepherd, thank You for laying down Your life for me. Help me to hear Your voice and follow You. Lead me in green pastures and beside still waters. I trust in Your care. Amen."
      },
      {
        id: 'day-15',
        day: 15,
        title: "The Way, Truth, and Life",
        scripture: "John 14:6",
        content: "Jesus makes an exclusive claim - He is the only way to the Father. This truth is both comforting for believers and challenging for our pluralistic world.",
        questions: [
          "What does it mean that Jesus is 'the way' to God?",
          "How do you respond to those who find this claim too exclusive?",
          "How has Jesus been the truth and life in your experience?"
        ],
        prayer: "Jesus, thank You for being the way to the Father. Help me to walk in Your truth and experience Your abundant life. Give me wisdom to share this truth with others in love. Amen."
      },
      {
        id: 'day-16',
        day: 16,
        title: "Love One Another",
        scripture: "John 13:34-35",
        content: "Jesus gives His disciples a new commandment: love one another as He has loved us. This love will be the distinguishing mark of His followers.",
        questions: [
          "How has Jesus loved you?",
          "Who in your Christian community needs your love?",
          "How can the church better demonstrate Christ's love to the world?"
        ],
        prayer: "Lord Jesus, thank You for loving me unconditionally. Help me to love my brothers and sisters in Christ with that same sacrificial love. Let our unity show the world that we are Your disciples. Amen."
      },
      {
        id: 'day-17',
        day: 17,
        title: "The Great Commission",
        scripture: "Matthew 28:18-20",
        content: "Before ascending to heaven, Jesus commissioned His followers to make disciples of all nations. This mission belongs to every believer, not just professional missionaries.",
        questions: [
          "How are you currently participating in the Great Commission?",
          "What fears hold you back from sharing your faith?",
          "Who has God placed in your life that needs to hear about Jesus?"
        ],
        prayer: "Lord Jesus, thank You for the promise that You are with us always. Give me boldness to share Your gospel and wisdom to make disciples. Help me to be faithful to Your commission. Amen."
      },
      {
        id: 'day-18',
        day: 18,
        title: "Abide in Me",
        scripture: "John 15:4-5",
        content: "Jesus uses the metaphor of a vine and branches to teach about our dependence on Him. Apart from Him, we can do nothing of eternal value.",
        questions: [
          "What does it mean to 'abide' in Jesus?",
          "How do you stay connected to Jesus throughout your day?",
          "What fruit is God producing in your life through this connection?"
        ],
        prayer: "Jesus, You are the vine and I am a branch. Help me to remain in You so that I can bear much fruit. Apart from You I can do nothing. Keep me close to You always. Amen."
      },
      {
        id: 'day-19',
        day: 19,
        title: "Take Up Your Cross",
        scripture: "Luke 9:23",
        content: "Following Jesus requires self-denial and daily commitment. Taking up our cross means dying to self and living for Christ's purposes.",
        questions: [
          "What does 'taking up your cross' look like in your daily life?",
          "What aspects of your 'self' do you struggle to deny?",
          "How has following Jesus required sacrifice in your life?"
        ],
        prayer: "Jesus, You carried the cross for me. Help me to take up my cross daily and follow You. Give me strength to deny myself and live for You. Make me faithful to the end. Amen."
      },
      {
        id: 'day-20',
        day: 20,
        title: "The Resurrection",
        scripture: "Matthew 28:1-10",
        content: "The resurrection of Jesus is the cornerstone of our faith. Because He lives, we too shall live. Death has been defeated and we have hope beyond the grave.",
        questions: [
          "What does the resurrection mean for your daily life?",
          "How does the hope of resurrection change how you face difficulties?",
          "How can you share the joy of the resurrection with others?"
        ],
        prayer: "Risen Lord, thank You for conquering death and giving us eternal life. Fill me with resurrection hope and joy. Help me to live in the power of Your resurrection each day. Amen."
      },
      {
        id: 'day-21',
        day: 21,
        title: "Peace Be With You",
        scripture: "John 20:19-21",
        content: "After His resurrection, Jesus' first words to His fearful disciples were 'Peace be with you.' He offers the same peace to us in our fears and uncertainties.",
        questions: [
          "What fears or anxieties are you facing today?",
          "How have you experienced Jesus' peace in difficult times?",
          "How can you be a bringer of peace to others?"
        ],
        prayer: "Prince of Peace, thank You for the peace that surpasses understanding. Calm my anxious heart and help me to trust in You. Make me an instrument of Your peace in this troubled world. Amen."
      },
      {
        id: 'day-22',
        day: 22,
        title: "Thomas's Doubt",
        scripture: "John 20:24-29",
        content: "Thomas needed to see to believe, but Jesus blessed those who believe without seeing. Doubt is not the opposite of faith but can be a pathway to stronger faith.",
        questions: [
          "What doubts about faith do you struggle with?",
          "How has God met you in your doubts?",
          "What would it mean to be blessed for believing without seeing?"
        ],
        prayer: "Lord Jesus, thank You for understanding our doubts. Strengthen my faith even when I cannot see. Help me to believe and say with Thomas, 'My Lord and my God!' Amen."
      },
      {
        id: 'day-23',
        day: 23,
        title: "Feed My Sheep",
        scripture: "John 21:15-17",
        content: "Jesus restored Peter after his denial by giving him the mission to feed His sheep. God can use our failures for His glory when we repent and return to Him.",
        questions: [
          "How has God restored you after failure?",
          "Who are the 'sheep' God has called you to care for?",
          "What gifts has God given you to serve His people?"
        ],
        prayer: "Good Shepherd, thank You for restoration after failure. Help me to care for others as You have cared for me. Use my experiences, even my failures, for Your glory. Amen."
      },
      {
        id: 'day-24',
        day: 24,
        title: "The Narrow Gate",
        scripture: "Matthew 7:13-14",
        content: "Jesus teaches that the path to life is narrow and few find it. Following Christ requires intentional choice and often goes against popular culture.",
        questions: [
          "What makes the path to life 'narrow'?",
          "Where do you feel pressure to take the 'wide road'?",
          "How can you encourage others to choose the narrow gate?"
        ],
        prayer: "Lord Jesus, thank You for showing us the way to life. Give me courage to choose the narrow gate even when it's difficult. Help me to walk the path of righteousness. Amen."
      },
      {
        id: 'day-25',
        day: 25,
        title: "Salt and Light",
        scripture: "Matthew 5:13-16",
        content: "Christians are called to be both salt (preserving and flavoring) and light (illuminating darkness) in the world. We influence culture by our presence and witness.",
        questions: [
          "How are you being 'salt' in your community?",
          "What darkness in your world needs the light of Christ?",
          "How can you make sure you don't lose your 'saltiness'?"
        ],
        prayer: "Lord, make me salt and light in this world. Help me to preserve what is good and illuminate what is dark. Keep me from losing my effectiveness for Your kingdom. Amen."
      },
      {
        id: 'day-26',
        day: 26,
        title: "The Cost of Discipleship",
        scripture: "Luke 14:25-33",
        content: "Jesus warns about counting the cost of following Him. Discipleship is not casual but requires total commitment. Yet the rewards far exceed the cost.",
        questions: [
          "What has following Jesus cost you?",
          "Are there areas where you've been a casual rather than committed follower?",
          "How do the rewards of discipleship outweigh the costs?"
        ],
        prayer: "Jesus, I want to follow You wholeheartedly. Help me to count the cost and choose You above all else. Make me a faithful disciple who finishes well. Amen."
      },
      {
        id: 'day-27',
        day: 27,
        title: "Washing the Disciples' Feet",
        scripture: "John 13:1-17",
        content: "Jesus, the King of kings, washed His disciples' feet, showing that leadership in His kingdom means service. We are called to serve others humbly.",
        questions: [
          "How does Jesus' example challenge your view of leadership?",
          "Who can you serve in a humble, behind-the-scenes way?",
          "What prevents you from serving others as Jesus did?"
        ],
        prayer: "Servant King, thank You for Your example of humble service. Help me to serve others with the same love and humility You showed. Make me great by being a servant. Amen."
      },
      {
        id: 'day-28',
        day: 28,
        title: "The Holy Spirit",
        scripture: "John 14:15-17, 26",
        content: "Jesus promised to send the Holy Spirit as our Helper, Teacher, and Comforter. The Spirit enables us to live the Christian life and understand God's truth.",
        questions: [
          "How have you experienced the Holy Spirit's help in your life?",
          "What do you need the Spirit to teach you?",
          "How can you be more sensitive to the Spirit's leading?"
        ],
        prayer: "Holy Spirit, thank You for being my Helper and Teacher. Fill me afresh and guide me in all truth. Help me to be sensitive to Your leading and empowered for service. Amen."
      },
      {
        id: 'day-29',
        day: 29,
        title: "Eternal Life",
        scripture: "John 3:16",
        content: "God's love for the world led Him to give His only Son so that whoever believes in Him will have eternal life. This is the gospel in one verse.",
        questions: [
          "What does 'eternal life' mean beyond just living forever?",
          "How does knowing God's love change your perspective on life?",
          "Who in your life needs to hear about God's gift of eternal life?"
        ],
        prayer: "Loving God, thank You for loving the world so much that You gave Your Son. Help me to fully grasp Your love and share it with others. Thank You for the gift of eternal life. Amen."
      },
      {
        id: 'day-30',
        day: 30,
        title: "Go and Make Disciples",
        scripture: "Matthew 28:19-20",
        content: "Our journey of walking with Jesus leads to helping others walk with Him too. As we've been discipled, we're called to disciple others in love and truth.",
        questions: [
          "How has this 30-day journey changed your relationship with Jesus?",
          "Who could you mentor or disciple in their faith journey?",
          "What's your next step in following Jesus more closely?"
        ],
        prayer: "Lord Jesus, thank You for these 30 days of walking with You. Continue to transform me into Your likeness. Use me to help others discover the joy of following You. I commit to continue walking with You always. Amen."
      }
    ]
  },
  {
    id: 'psalms-of-hope',
    title: "Psalms of Hope",
    description: "Finding comfort and strength in David's words",
    duration: 14,
    category: "Comfort",
    difficulty: "All Levels",
    participants: 890,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "The Lord is My Shepherd",
        scripture: "Psalm 23",
        content: "Perhaps the most beloved psalm, Psalm 23 reminds us of God's tender care and provision. Even in difficult times, we can trust in His goodness. David's confidence came from knowing God personally as his shepherd.",
        questions: [
          "What does it mean to you that the Lord is your shepherd?",
          "How have you experienced God's provision in your life?",
          "What 'valley' are you walking through that needs God's comfort?"
        ],
        prayer: "Good Shepherd, thank You for caring for me so tenderly. In times of difficulty, help me to trust in Your provision and protection. Lead me in paths of righteousness for Your name's sake. Amen."
      },
      {
        id: 'day-2',
        day: 2,
        title: "My Refuge and Strength",
        scripture: "Psalm 46:1-3",
        content: "God is our refuge and strength, an ever-present help in trouble. When everything around us shakes, God remains our firm foundation. He is not just strong; He is our strength.",
        questions: [
          "When have you experienced God as your refuge?",
          "What troubles are you facing that need God's strength?",
          "How can you find peace when your world feels like it's shaking?"
        ],
        prayer: "Almighty God, You are my refuge and strength. When troubles surround me, help me to run to You. Be my peace in the storm and my strength when I am weak. Amen."
      },
      {
        id: 'day-3',
        day: 3,
        title: "Under His Wings",
        scripture: "Psalm 91:1-4",
        content: "Those who dwell in the shelter of the Most High find rest and protection under His wings. Like a mother bird protects her young, God covers us with His faithfulness and truth.",
        questions: [
          "What does it mean to 'dwell in the shelter of the Most High'?",
          "How have you experienced God's protection in your life?",
          "What fears do you need to place under God's protective wings?"
        ],
        prayer: "Most High God, I choose to dwell in Your shelter. Cover me with Your wings and let me rest in Your protection. Help me to trust in Your faithfulness when fear tries to overtake me. Amen."
      },
      {
        id: 'day-4',
        day: 4,
        title: "He Knows My Way",
        scripture: "Psalm 139:1-6",
        content: "God knows us completely - our thoughts, our words, our ways. This intimate knowledge might seem overwhelming, but it's actually deeply comforting. We are fully known and fully loved.",
        questions: [
          "How do you feel knowing that God knows everything about you?",
          "What comfort does it bring that God understands your thoughts and feelings?",
          "How does being fully known by God change how you approach Him?"
        ],
        prayer: "All-knowing God, thank You for knowing me completely and loving me still. Help me to find comfort in Your intimate knowledge of my heart. I have no need to hide from You. Amen."
      },
      {
        id: 'day-5',
        day: 5,
        title: "Wait for the Lord",
        scripture: "Psalm 27:13-14",
        content: "David's confidence was not in his circumstances but in seeing God's goodness in the land of the living. Waiting on God requires faith, but it builds strength and hope.",
        questions: [
          "What are you currently waiting for God to do?",
          "How can you remain hopeful while waiting?",
          "What does it mean to 'take heart' in difficult times?"
        ],
        prayer: "Lord, I believe I will see Your goodness in my life. While I wait, strengthen my heart and increase my faith. Help me to wait patiently and expectantly for You. Amen."
      },
      {
        id: 'day-6',
        day: 6,
        title: "Joy Comes in the Morning",
        scripture: "Psalm 30:5",
        content: "Weeping may endure for a night, but joy comes in the morning. Our darkest moments are not permanent. God promises that sorrow will give way to joy.",
        questions: [
          "What 'night season' are you experiencing right now?",
          "How have you seen God bring joy after sorrow in your life?",
          "What hope can you hold onto during difficult times?"
        ],
        prayer: "God of hope, thank You that weeping is not forever. Even in my darkest nights, help me to look forward to the joy You promise. Fill me with hope for the morning. Amen."
      },
      {
        id: 'day-7',
        day: 7,
        title: "Cast Your Cares",
        scripture: "Psalm 55:22",
        content: "We are invited to cast our cares upon the Lord because He cares for us. God is not burdened by our burdens; He is strengthened to carry them for us.",
        questions: [
          "What cares are you carrying that belong to God?",
          "Why is it sometimes hard to give our worries to God?",
          "How has God sustained you through difficult times?"
        ],
        prayer: "Caring God, I cast all my anxieties on You because You care for me. Take these burdens I was never meant to carry. Sustain me with Your love and strength. Amen."
      },
      {
        id: 'day-8',
        day: 8,
        title: "He Lifted Me Up",
        scripture: "Psalm 40:1-3",
        content: "God lifts us out of the miry pit and sets our feet on solid ground. He puts a new song in our mouths - a song of praise. Our testimony becomes hope for others.",
        questions: [
          "From what 'pit' has God lifted you?",
          "What 'new song' has God given you to sing?",
          "How can your story give hope to someone else?"
        ],
        prayer: "Rescuing God, thank You for lifting me from the pit and setting my feet on solid ground. Fill my mouth with songs of praise for Your faithfulness. Use my story to encourage others. Amen."
      },
      {
        id: 'day-9',
        day: 9,
        title: "The Lord is Close",
        scripture: "Psalm 34:18",
        content: "The Lord is close to the brokenhearted and saves those who are crushed in spirit. In our deepest pain, God is not distant but near, ready to heal and restore.",
        questions: [
          "When have you felt brokenhearted and sensed God's nearness?",
          "How does God's closeness in pain comfort you?",
          "Who around you needs to know that God is close to the brokenhearted?"
        ],
        prayer: "Compassionate God, thank You for being close when my heart is broken. Heal my wounded spirit and restore my joy. Help me to comfort others with the comfort You've given me. Amen."
      },
      {
        id: 'day-10',
        day: 10,
        title: "My Light and Salvation",
        scripture: "Psalm 27:1",
        content: "The Lord is our light and salvation - whom shall we fear? When God is our light, darkness cannot overcome us. When He is our salvation, no enemy can defeat us.",
        questions: [
          "What darkness in your life needs God's light?",
          "What fears would lose their power if you truly believed God is your salvation?",
          "How can you walk confidently knowing God is your light?"
        ],
        prayer: "Lord, You are my light and salvation. Dispel the darkness of fear and doubt in my life. Help me to walk confidently in Your light, knowing You are my defender. Amen."
      },
      {
        id: 'day-11',
        day: 11,
        title: "He Restores My Soul",
        scripture: "Psalm 23:3",
        content: "God doesn't just meet our physical needs; He restores our souls. When we're weary, depleted, or discouraged, He renews our inner being and guides us in righteousness.",
        questions: [
          "In what ways does your soul need restoration?",
          "How has God restored you in the past?",
          "What does it mean to be led in 'paths of righteousness'?"
        ],
        prayer: "Restoring God, my soul is weary and needs Your renewal. Restore my joy, my peace, and my hope. Lead me in Your righteous paths for Your name's sake. Amen."
      },
      {
        id: 'day-12',
        day: 12,
        title: "Songs in the Night",
        scripture: "Psalm 42:8",
        content: "God gives us songs in the night - hope and praise even in dark times. His love and faithfulness don't depend on our circumstances but shine brightest in our darkest hours.",
        questions: [
          "What 'night seasons' have taught you to depend on God?",
          "How has God's love been evident even in difficult times?",
          "What song is God giving you to sing right now?"
        ],
        prayer: "God of hope, even in my darkest nights, You give me reason to sing. Your love never fails, and Your faithfulness endures forever. Fill my heart with Your song. Amen."
      },
      {
        id: 'day-13',
        day: 13,
        title: "He Heals the Brokenhearted",
        scripture: "Psalm 147:3",
        content: "God heals the brokenhearted and binds up their wounds. He doesn't just comfort us in our pain; He actively works to heal and restore what has been broken.",
        questions: [
          "What broken areas of your heart need God's healing?",
          "How have you experienced God's healing power?",
          "How can you participate in God's healing work for others?"
        ],
        prayer: "Healing God, You specialize in mending broken hearts and binding up wounds. Touch the broken places in my heart and make me whole. Use me to bring Your healing to others. Amen."
      },
      {
        id: 'day-14',
        day: 14,
        title: "His Love Endures Forever",
        scripture: "Psalm 136:1",
        content: "The refrain 'His love endures forever' appears 26 times in Psalm 136. God's steadfast love is the foundation of all hope. It never changes, never fails, never ends.",
        questions: [
          "How has God's enduring love been evident in your life?",
          "What would change if you truly believed God's love for you is permanent?",
          "How can you share the hope of God's enduring love with others?"
        ],
        prayer: "Faithful God, Your love endures forever. When everything else changes, Your love remains constant. Help me to rest in this truth and share this hope with a world that needs to know Your love. Amen."
      }
    ]
  },
  {
    id: 'proverbs-wisdom',
    title: "Proverbs for Daily Living",
    description: "Practical wisdom for everyday decisions",
    duration: 21,
    category: "Wisdom",
    difficulty: "Intermediate",
    participants: 2100,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "The Fear of the Lord",
        scripture: "Proverbs 1:7",
        content: "True wisdom begins with reverence for God. This 'fear' is not terror, but a healthy respect and awe for God's holiness and authority. When we honor God first, all other knowledge finds its proper place.",
        questions: [
          "What does 'fear of the Lord' mean in practical terms?",
          "How does reverence for God change your daily decisions?",
          "Where do you need wisdom in your life right now?"
        ],
        prayer: "Lord, give me a heart that reveres You above all else. Help me to seek wisdom from You in all my decisions. Make me teachable and humble before You. Amen."
      },
      {
        id: 'day-2',
        day: 2,
        title: "Trust in the Lord",
        scripture: "Proverbs 3:5-6",
        content: "We're called to trust God with all our heart, not leaning on our own understanding. When we acknowledge Him in all our ways, He promises to direct our paths.",
        questions: [
          "In what areas do you struggle to trust God completely?",
          "How do you 'acknowledge' God in your daily decisions?",
          "What does it look like to not lean on your own understanding?"
        ],
        prayer: "Lord, I choose to trust You with all my heart. Help me not to rely solely on my own understanding but to seek Your wisdom. Direct my paths according to Your will. Amen."
      },
      {
        id: 'day-3',
        day: 3,
        title: "Guard Your Heart",
        scripture: "Proverbs 4:23",
        content: "Above all else, we must guard our hearts because everything we do flows from it. Our heart is the source of our thoughts, emotions, and actions.",
        questions: [
          "What influences are you allowing into your heart?",
          "How do you currently guard your heart from negative influences?",
          "What flows from your heart - love, bitterness, joy, or fear?"
        ],
        prayer: "God, help me to guard my heart diligently. Show me what influences I need to remove and what I need to embrace. Let love, joy, and peace flow from my heart. Amen."
      },
      {
        id: 'day-4',
        day: 4,
        title: "The Power of Words",
        scripture: "Proverbs 18:21",
        content: "Death and life are in the power of the tongue. Our words have incredible power to build up or tear down, to encourage or discourage, to heal or harm.",
        questions: [
          "How have your words impacted others recently?",
          "What kind of 'fruit' do your words typically produce?",
          "Who in your life needs life-giving words from you?"
        ],
        prayer: "Lord, help me to use my words to bring life and encouragement. Guard my tongue from harmful speech. Let my words be seasoned with grace and truth. Amen."
      },
      {
        id: 'day-5',
        day: 5,
        title: "A Gentle Answer",
        scripture: "Proverbs 15:1",
        content: "A gentle answer turns away wrath, but a harsh word stirs up anger. How we respond in conflict can either escalate or de-escalate tension.",
        questions: [
          "When do you find it hardest to give a gentle answer?",
          "How have you seen gentle responses change difficult situations?",
          "What helps you control your reaction when provoked?"
        ],
        prayer: "Lord, give me wisdom to respond gently when faced with anger or conflict. Help me to be slow to speak and quick to listen. Let Your peace rule in my responses. Amen."
      },
      {
        id: 'day-6',
        day: 6,
        title: "Pride Goes Before a Fall",
        scripture: "Proverbs 16:18",
        content: "Pride leads to destruction and a haughty spirit to a fall. Humility is not thinking less of ourselves but thinking of ourselves less.",
        questions: [
          "In what areas of your life do you struggle with pride?",
          "How has pride caused problems in your relationships?",
          "What does true humility look like in daily life?"
        ],
        prayer: "Humble Savior, help me to walk in humility rather than pride. Show me areas where I need to humble myself. Let me find my worth in You alone. Amen."
      },
      {
        id: 'day-7',
        day: 7,
        title: "Plans of the Heart",
        scripture: "Proverbs 16:9",
        content: "We can make our plans, but the Lord determines our steps. This teaches us to hold our plans loosely while trusting God's sovereignty.",
        questions: [
          "What plans are you currently making?",
          "How do you balance planning with trusting God's sovereignty?",
          "When have you seen God redirect your plans for the better?"
        ],
        prayer: "Sovereign Lord, I bring my plans to You. Help me to plan wisely but hold my plans loosely. Direct my steps according to Your perfect will. Amen."
      },
      {
        id: 'day-8',
        day: 8,
        title: "A Friend Loves at All Times",
        scripture: "Proverbs 17:17",
        content: "True friendship is constant and loyal. A real friend loves not only in good times but especially during adversity and challenges.",
        questions: [
          "What kind of friend are you to others?",
          "Who has been a loyal friend to you through difficult times?",
          "How can you show loyal love to a friend who's struggling?"
        ],
        prayer: "God of love, thank You for faithful friends. Help me to be the kind of friend who loves at all times. Show me how to support those who are going through adversity. Amen."
      },
      {
        id: 'day-9',
        day: 9,
        title: "Iron Sharpens Iron",
        scripture: "Proverbs 27:17",
        content: "Just as iron sharpens iron, we sharpen each other through honest relationships. We need people who will speak truth into our lives.",
        questions: [
          "Who in your life helps sharpen you spiritually?",
          "How do you respond when someone offers you correction or advice?",
          "Who could you help sharpen through encouragement and truth?"
        ],
        prayer: "Lord, thank You for people who sharpen me through their wisdom and truth. Help me to receive correction gracefully and to lovingly help others grow too. Amen."
      },
      {
        id: 'day-10',
        day: 10,
        title: "The Way of the Righteous",
        scripture: "Proverbs 4:18",
        content: "The path of the righteous is like the morning sun, shining ever brighter until the full light of day. Walking with God brings increasing clarity and blessing.",
        questions: [
          "How has your spiritual journey become brighter over time?",
          "What areas of your life need more of God's light?",
          "How can you help others find the path of righteousness?"
        ],
        prayer: "God of light, thank You that the path of righteousness grows brighter. Illuminate my way and help me to walk steadily toward You. Use me to guide others to Your light. Amen."
      },
      {
        id: 'day-11',
        day: 11,
        title: "Diligent Hands",
        scripture: "Proverbs 10:4",
        content: "Lazy hands make for poverty, but diligent hands bring wealth. This isn't just about money but about the fruit that comes from faithful, consistent effort.",
        questions: [
          "In what areas of your life do you need to be more diligent?",
          "How has diligence brought blessing to your life?",
          "What motivates you to work hard and be faithful?"
        ],
        prayer: "God of faithfulness, help me to be diligent in all I do. Give me strength to work hard and wisdom to work smart. Let my efforts bring blessing to myself and others. Amen."
      },
      {
        id: 'day-12',
        day: 12,
        title: "A Cheerful Heart",
        scripture: "Proverbs 17:22",
        content: "A cheerful heart is good medicine, but a crushed spirit dries up the bones. Joy has healing power, while despair weakens us physically and emotionally.",
        questions: [
          "What brings you genuine joy and cheerfulness?",
          "How does your attitude affect your health and relationships?",
          "How can you cultivate a more cheerful heart?"
        ],
        prayer: "God of joy, fill my heart with Your cheerfulness. Help me to find reasons to rejoice even in difficult circumstances. Let my joy be a healing presence to others. Amen."
      },
      {
        id: 'day-13',
        day: 13,
        title: "Generous Giving",
        scripture: "Proverbs 11:25",
        content: "A generous person will prosper; whoever refreshes others will be refreshed. Generosity creates a cycle of blessing that returns to the giver.",
        questions: [
          "How has generosity blessed your life?",
          "What holds you back from being more generous?",
          "Who could you refresh through your generosity today?"
        ],
        prayer: "Generous God, You have blessed me abundantly. Help me to be generous with my time, resources, and love. Show me how to refresh others as You have refreshed me. Amen."
      },
      {
        id: 'day-14',
        day: 14,
        title: "Self-Control",
        scripture: "Proverbs 25:28",
        content: "Like a city whose walls are broken through is a person who lacks self-control. Self-control is our defense against temptation and poor decisions.",
        questions: [
          "In what areas do you struggle with self-control?",
          "How has lack of self-control caused problems in your life?",
          "What strategies help you maintain self-discipline?"
        ],
        prayer: "Lord, help me to build strong walls of self-control around my life. Give me strength to resist temptation and wisdom to make good choices. Be my defender and guide. Amen."
      },
      {
        id: 'day-15',
        day: 15,
        title: "Wise Counsel",
        scripture: "Proverbs 19:20",
        content: "Listen to advice and accept discipline, and at the end you will be counted among the wise. Wisdom often comes through the counsel of others.",
        questions: [
          "Who do you turn to for wise counsel?",
          "How well do you listen to advice from others?",
          "What advice have you received that changed your life?"
        ],
        prayer: "God of wisdom, help me to be teachable and open to counsel. Surround me with wise advisors and give me humility to receive their input. Make me wise in all my ways. Amen."
      },
      {
        id: 'day-16',
        day: 16,
        title: "Patience and Understanding",
        scripture: "Proverbs 14:29",
        content: "Whoever is patient has great understanding, but one who is quick-tempered displays folly. Patience reveals wisdom while impatience reveals foolishness.",
        questions: [
          "When do you find it hardest to be patient?",
          "How has patience led to better understanding in your life?",
          "What helps you remain calm when you want to react quickly?"
        ],
        prayer: "Patient God, You are slow to anger and abounding in love. Help me to be patient with others and with circumstances. Give me understanding rather than quick judgment. Amen."
      },
      {
        id: 'day-17',
        day: 17,
        title: "Honest Dealing",
        scripture: "Proverbs 11:1",
        content: "The Lord detests dishonest scales, but accurate weights find favor with him. God values honesty and integrity in all our dealings.",
        questions: [
          "In what areas of your life do you need to be more honest?",
          "How does integrity benefit your relationships and reputation?",
          "What tempts you to be dishonest, and how can you resist?"
        ],
        prayer: "God of truth, help me to be honest in all my dealings. Give me integrity that honors You and builds trust with others. Keep me from any form of deception. Amen."
      },
      {
        id: 'day-18',
        day: 18,
        title: "The Righteous Stand Firm",
        scripture: "Proverbs 10:25",
        content: "When the storm has swept by, the wicked are gone, but the righteous stand firm forever. Living righteously provides stability that weathers any storm.",
        questions: [
          "What storms have you weathered by standing firm in righteousness?",
          "What helps you remain steadfast during difficult times?",
          "How can you help others stand firm in their faith?"
        ],
        prayer: "Righteous God, help me to stand firm in righteousness no matter what storms come. Be my foundation and strength. Help me to encourage others to stand firm too. Amen."
      },
      {
        id: 'day-19',
        day: 19,
        title: "Training Children",
        scripture: "Proverbs 22:6",
        content: "Start children off on the way they should go, and even when they are old they will not turn from it. The investment we make in young lives has lasting impact.",
        questions: [
          "How were you guided in the right direction as a child?",
          "What children in your life need your guidance and investment?",
          "How can you help shape the next generation?"
        ],
        prayer: "God of generations, help me to be a positive influence on young people. Give me wisdom to guide children in Your ways. Use me to help shape lives for Your kingdom. Amen."
      },
      {
        id: 'day-20',
        day: 20,
        title: "The Reward of Humility",
        scripture: "Proverbs 22:4",
        content: "Humility is the fear of the Lord; its wages are riches and honor and life. True humility before God brings blessings that pride can never achieve.",
        questions: [
          "How has humility brought blessing to your life?",
          "What does it mean to have 'riches and honor and life' from God?",
          "How can you cultivate greater humility?"
        ],
        prayer: "Humble Savior, teach me the way of humility. Help me to fear You appropriately and walk humbly before You. Let humility bring true riches to my life. Amen."
      },
      {
        id: 'day-21',
        day: 21,
        title: "Living Wisely",
        scripture: "Proverbs 27:1",
        content: "Do not boast about tomorrow, for you do not know what a day may bring. This reminds us to live wisely today, trusting God for tomorrow.",
        questions: [
          "How can you live more wisely today?",
          "What have these 21 days taught you about practical wisdom?",
          "How will you continue to seek God's wisdom in daily decisions?"
        ],
        prayer: "Wise God, thank You for 21 days of learning Your wisdom. Help me to apply these truths daily. Continue to guide me in wisdom and help me to trust You for each new day. Amen."
      }
    ]
  }
];

export const getUserProgress = async (planId: string): Promise<number> => {
  // In a real app, this would fetch from database
  // For now, return mock progress
  const mockProgress: Record<string, number> = {
    'walking-with-jesus': 12,
    'psalms-of-hope': 0,
    'proverbs-wisdom': 7
  };
  
  return mockProgress[planId] || 0;
};

export const updateLessonProgress = async (planId: string, lessonId: string, completed: boolean): Promise<void> => {
  // In a real app, this would update the database
  console.log(`Lesson ${lessonId} in plan ${planId} marked as ${completed ? 'completed' : 'incomplete'}`);
};

export const getStudyPlanById = (id: string): StudyPlan | undefined => {
  return studyPlansDatabase.find(plan => plan.id === id);
};