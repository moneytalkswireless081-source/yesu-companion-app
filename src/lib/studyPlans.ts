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
  additionalScriptures: string[];
  questions: string[];
  prayer: string;
  completed?: boolean;
}

export const studyPlansDatabase: StudyPlan[] = [
  {
    id: 'walking-with-jesus',
    title: "Walking with Jesus",
    description: "A comprehensive 30-day journey through the life and teachings of Christ, exploring His character and how we can follow His example in our daily lives.",
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
        content: "When Jesus called the first disciples, He found them in the midst of their ordinary work—fishing by the Sea of Galilee. These were not religious scholars or temple priests, but simple fishermen going about their daily business. Yet Jesus saw something in them that they perhaps didn't see in themselves. His call to 'follow Me, and I will make you fishers of men' was both an invitation and a transformation promise. The disciples' immediate response—leaving their nets and following Him—demonstrates the compelling nature of Jesus' call. This same call comes to each of us today, not necessarily to abandon our careers, but to reorient our lives around His purposes. Following Jesus means more than intellectual belief; it requires a willingness to trust Him with our lives, to learn from Him, and to participate in His mission. The transformation from fishermen to 'fishers of men' didn't happen overnight—it was a process that required time, patience, and repeated lessons. Similarly, our journey with Jesus is one of continuous growth and learning as He shapes us into the people He has called us to be.",
        additionalScriptures: [
          "Mark 1:16-20 - The calling of the first disciples",
          "Luke 5:1-11 - The miraculous catch of fish",
          "John 1:35-42 - Jesus calls Andrew and Peter",
          "Matthew 9:9 - The calling of Matthew",
          "Luke 14:25-33 - The cost of discipleship",
          "John 15:16 - Jesus chose us"
        ],
        questions: [
          "What does it mean to 'follow' Jesus in your current life circumstances and daily responsibilities?",
          "What 'nets' (habits, priorities, fears) might you need to leave behind to follow Jesus more closely?",
          "How can you respond to Jesus' call today in practical, tangible ways?",
          "What transformation do you hope Jesus will bring about in your life as you follow Him?"
        ],
        prayer: "Lord Jesus, thank You for calling me to follow You just as I am, in the midst of my ordinary life. Like the disciples, I want to respond with faith and obedience. Help me to trust You with my life's direction and to be willing to leave behind anything that hinders my relationship with You. Transform me as I walk with You, and use me in Your mission to reach others. Give me courage to take the first steps of faith and to continue following You even when the path is unclear. Make me a faithful disciple who reflects Your love and character to everyone I meet. Amen."
      },
      {
        id: 'day-2',
        day: 2,
        title: "The Greatest Commandment",
        scripture: "Matthew 22:37-39",
        content: "When asked about the greatest commandment, Jesus didn't hesitate. Love God with all your heart, soul, and mind, and love your neighbor as yourself. These two commandments aren't separate—they're intrinsically connected. Our love for God naturally overflows into love for others. The word 'all' is significant here; Jesus calls for complete, undivided love. Heart represents our emotions and desires, soul our inner being and will, and mind our thoughts and understanding. This comprehensive love means every aspect of our being should be oriented toward God. The second commandment flows naturally from the first. When we truly love God, we begin to see others through His eyes—as people created in His image, worthy of love and respect regardless of their actions toward us. This love isn't merely feeling but action, choice, and commitment. It means seeking the best for others, serving them, forgiving them, and treating them with dignity. Jesus Himself perfectly embodied these commandments, showing us what radical love looks like in practice. His love for the Father motivated His obedience even unto death, and His love for humanity drove Him to sacrifice everything for our salvation.",
        additionalScriptures: [
          "Deuteronomy 6:4-9 - The Shema, foundation of Jewish faith",
          "1 John 4:19-21 - We love because He first loved us",
          "Romans 13:8-10 - Love fulfills the law",
          "1 Corinthians 13:1-13 - The love chapter",
          "Mark 12:28-34 - The greatest commandment context",
          "Leviticus 19:18 - Love your neighbor as yourself"
        ],
        questions: [
          "How do you currently express love to God with your heart, soul, and mind in daily life?",
          "Who in your life is difficult to love, and how might God be calling you to love them?",
          "What practical steps can you take today to love someone in your community better?",
          "How does knowing God's love for you change the way you view and treat yourself and others?"
        ],
        prayer: "Heavenly Father, You are worthy of all my love and devotion. Help me to love You with every part of my being—my emotions, my will, my thoughts, and my actions. Fill my heart with Your love so that it overflows naturally to those around me. Teach me to see others through Your eyes of compassion and grace. When loving is difficult, remind me of how much You have loved me. Give me wisdom to know how to love others well, patience when they disappoint me, and courage to love even when it's costly. Make me an instrument of Your love in this world, reflecting Your character in all my relationships. Transform my heart to be more like Yours. Amen."
      },
      {
        id: 'day-3',
        day: 3,
        title: "Jesus' Compassion",
        scripture: "Matthew 9:35-38",
        content: "As Jesus traveled through towns and villages, He didn't just see crowds—He saw individuals. The Greek word for compassion used here, 'splagchnizomai,' refers to a deep, gut-wrenching emotion, literally meaning to be moved in one's bowels or inner parts. This wasn't superficial pity but profound, visceral empathy. Jesus saw people as 'harassed and helpless, like sheep without a shepherd.' The word 'harassed' suggests being troubled, distressed, or torn apart, while 'helpless' means thrown down or abandoned. These people weren't just physically needy; they were spiritually lost, emotionally wounded, and desperately seeking direction and hope. Jesus' response to this overwhelming need wasn't to retreat in despair but to be moved to action. His compassion led to healing, teaching, and ultimately to His instruction for the disciples to pray for more workers. This passage reveals both the heart of God and our calling as His followers. We're called to develop this same compassionate vision—to look beyond surface appearances and see the deep spiritual and emotional needs around us. Compassion isn't complete until it moves us to action, whether through prayer, service, or sharing the hope we have in Christ.",
        additionalScriptures: [
          "Mark 6:34 - Jesus had compassion on the crowd",
          "Luke 7:11-17 - Jesus raises the widow's son",
          "Matthew 14:13-14 - Compassion despite wanting solitude",
          "Colossians 3:12 - Clothe yourselves with compassion",
          "1 Peter 3:8 - Be sympathetic and compassionate",
          "Isaiah 53:4 - He took our infirmities"
        ],
        questions: [
          "When have you most deeply felt Jesus' compassion in your own life during difficult times?",
          "Who around you appears 'harassed and helpless' and needs God's compassion through you?",
          "How can you develop a more compassionate heart that sees beyond surface appearances?",
          "What specific action can you take this week to show Christ's compassion to someone in need?"
        ],
        prayer: "Compassionate Savior, thank You for seeing me in my need and responding with love and mercy. Your heart breaks for the lost, hurting, and abandoned, and I want to share in that heart. Open my eyes to see people as You see them—not as interruptions or inconveniences, but as precious souls in need of hope and healing. Give me a heart that is moved by the suffering and lostness around me. Help me to be Your hands and feet in bringing comfort to the distressed, hope to the discouraged, and love to the unloved. Use me as an instrument of Your compassion, and show me how to serve others with the same tender care You have shown me. Make me sensitive to the needs of those I encounter today. Amen."
      }
      // Additional lessons would continue in the same detailed format...
    ]
  },
  {
    id: 'psalms-of-hope',
    title: "Psalms of Hope",
    description: "Discover comfort, strength, and renewed faith through 21 days of studying the most hope-filled psalms in Scripture.",
    duration: 21,
    category: "Worship",
    difficulty: "All Levels",
    participants: 892,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "The Lord is My Shepherd",
        scripture: "Psalm 23:1-6",
        content: "Psalm 23 is perhaps the most beloved passage in all of Scripture, offering profound comfort to millions across centuries. David's declaration 'The Lord is my shepherd' establishes a relationship of complete trust and dependence. In ancient times, shepherds risked their lives to protect their flocks from predators, led them to fresh pastures and clean water, and knew each sheep individually. When David calls God his shepherd, he's acknowledging God's personal care, protection, and provision. The phrase 'I shall not want' doesn't mean we'll never desire anything, but that we won't lack what we truly need because our shepherd knows our needs better than we do. The 'green pastures' and 'still waters' represent places of rest and refreshment that God provides for our souls. Even in the 'valley of the shadow of death'—times of danger, sorrow, or overwhelming difficulty—we need not fear because our shepherd walks with us. His rod (for protection) and staff (for guidance) comfort us. The psalm concludes with a beautiful picture of being welcomed as an honored guest at God's table, even in the presence of enemies, and dwelling in His house forever. This psalm reminds us that no matter our circumstances, we are never alone or forgotten.",
        additionalScriptures: [
          "John 10:11-16 - Jesus the Good Shepherd",
          "Isaiah 40:11 - He tends his flock like a shepherd",
          "Ezekiel 34:11-16 - God searches for His sheep",
          "Luke 15:3-7 - The parable of the lost sheep",
          "Hebrews 13:20 - The great shepherd of the sheep",
          "1 Peter 2:25 - The shepherd and overseer of souls"
        ],
        questions: [
          "How have you experienced God as your shepherd during difficult seasons of life?",
          "What does it mean to you personally that you 'shall not want' with God as your shepherd?",
          "When have you walked through a 'valley of the shadow of death' and found God's presence comforting?",
          "How can this psalm change your perspective on current challenges you're facing?"
        ],
        prayer: "Good Shepherd, thank You for Your tender care and constant presence in my life. You know exactly what I need before I even ask, and You faithfully provide for me in ways I don't always recognize. When I'm anxious about the future, remind me that You are leading me to green pastures and still waters. When I walk through dark valleys of difficulty, help me feel Your presence beside me and find comfort in Your protection. Prepare a place for me at Your table and let Your goodness and mercy follow me all the days of my life. Help me to trust You completely as my shepherd, knowing that You will never leave me or forsake me. May Your peace fill my heart today. Amen."
      }
      // Additional lessons would continue...
    ]
  },
  {
    id: 'proverbs-wisdom',
    title: "Proverbs for Daily Living",
    description: "Practical wisdom from the book of Proverbs for making godly decisions and living with integrity in everyday situations.",
    duration: 14,
    category: "Wisdom",
    difficulty: "Intermediate",
    participants: 654,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "The Fear of the Lord",
        scripture: "Proverbs 1:7",
        content: "The book of Proverbs begins with a foundational truth: 'The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.' This 'fear' isn't terror or dread, but rather awe, reverence, and deep respect for God's character, power, and authority. It's the recognition that God is infinitely greater than we are and deserves our complete submission and worship. This fear becomes the foundation for all true wisdom because it establishes the proper relationship between Creator and creation. When we understand who God is—holy, just, loving, and all-knowing—we naturally want to align our lives with His will and ways. True knowledge begins when we acknowledge that God is the source of all truth and that His perspective is higher than ours. Without this foundation, our human wisdom becomes foolishness because it lacks the eternal perspective that only comes from God. The 'fools' mentioned here aren't necessarily intellectually deficient people, but those who reject God's authority and choose to live as if they know better than their Creator. Wisdom, then, is not just intellectual understanding but a way of living that honors God and follows His principles. This verse sets the tone for the entire book, establishing that practical wisdom for daily living must be grounded in a right relationship with God.",
        additionalScriptures: [
          "Proverbs 9:10 - Fear of the Lord is beginning of wisdom",
          "Psalm 111:10 - The fear of the Lord is beginning of wisdom",
          "Job 28:28 - The fear of the Lord is wisdom",
          "Ecclesiastes 12:13 - Fear God and keep His commandments",
          "Isaiah 11:2-3 - The spirit of the fear of the Lord",
          "2 Corinthians 7:1 - Perfecting holiness in fear of God"
        ],
        questions: [
          "What does 'fearing the Lord' look like in your daily decisions and attitudes?",
          "How has your understanding of God's character influenced your pursuit of wisdom?",
          "In what areas of your life do you need to submit more fully to God's authority?",
          "How can you cultivate a deeper reverence for God in your worship and daily walk?"
        ],
        prayer: "Holy Father, I acknowledge that You are the source of all wisdom and truth. Help me to develop a proper fear and reverence for You that transforms how I think, speak, and act. I confess that sometimes I try to rely on my own understanding instead of seeking Your wisdom first. Forgive me for the times I've acted foolishly by ignoring Your instruction. Give me a teachable heart that eagerly receives Your wisdom through Your Word, Your Spirit, and the counsel of godly people. May my life reflect the wisdom that comes from knowing and honoring You. Help me to make decisions today that demonstrate my reverence for You and my desire to live according to Your ways. Make me wise in Your sight. Amen."
      }
      // Additional lessons would continue...
    ]
  },
  {
    id: 'book-of-romans',
    title: "Journey Through Romans",
    description: "An in-depth exploration of Paul's letter to the Romans, discovering the depth of God's grace and the foundation of Christian faith.",
    duration: 28,
    category: "Doctrine",
    difficulty: "Advanced",
    participants: 423,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "The Gospel of God",
        scripture: "Romans 1:1-7",
        content: "Paul begins his masterpiece letter with a powerful introduction that establishes his authority and the nature of the gospel he proclaims. As a 'servant of Christ Jesus,' Paul uses the Greek word 'doulos,' meaning bondservant or slave, indicating complete devotion and submission to his master. Yet this slavery is voluntary and joyful, born out of love and gratitude for salvation. Paul's calling as an apostle wasn't self-appointed but came directly from God, giving him divine authority to speak on behalf of Christ. The gospel he proclaims isn't a new invention but was 'promised beforehand through his prophets in the Holy Scriptures,' showing the continuity between Old and New Testament revelation. This gospel centers on God's Son, who was descended from David according to the flesh, fulfilling messianic prophecies, and declared to be the Son of God in power according to the Spirit of holiness by His resurrection from the dead. The resurrection is crucial—it validates Jesus' claims and demonstrates His victory over sin and death. Through Christ, Paul and all believers receive grace and apostleship to bring about the obedience of faith among all nations. This phrase 'obedience of faith' is key to understanding Romans—true faith always results in obedience, and true obedience flows from faith.",
        additionalScriptures: [
          "1 Corinthians 9:16-17 - Paul's compulsion to preach",
          "Galatians 1:1 - Paul's apostolic calling",
          "2 Timothy 1:1 - Apostle by the will of God",
          "Acts 9:15-16 - God's choice of Paul",
          "1 Corinthians 15:3-4 - The gospel defined",
          "2 Samuel 7:12-13 - Promise to David"
        ],
        questions: [
          "What does it mean to be a 'servant of Christ Jesus' in your daily life and relationships?",
          "How does understanding the gospel as God's ancient promise affect your view of Scripture?",
          "In what ways does the resurrection of Jesus impact your faith and hope?",
          "How can you demonstrate the 'obedience of faith' in your current circumstances?"
        ],
        prayer: "Heavenly Father, thank You for the gospel of Your Son, Jesus Christ, which You promised long ago and fulfilled in perfect timing. Like Paul, I want to be Your faithful servant, wholly devoted to Your purposes and calling. Help me to understand more deeply the significance of Jesus' resurrection and what it means for my life today. Give me a heart of obedience that flows from genuine faith and love for You. Use me to share this good news with others, whether through my words or my example. May my life demonstrate the transforming power of the gospel and bring glory to Your name. Thank You for calling me to be part of Your family and Your mission in the world. Amen."
      }
      // Additional lessons would continue...
    ]
  },
  {
    id: 'miracles-of-jesus',
    title: "Miracles of Jesus",
    description: "Witness the power and compassion of Christ through 15 days studying His miraculous works and their meaning for today.",
    duration: 15,
    category: "Ministry",
    difficulty: "Beginner",
    participants: 756,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "Water into Wine",
        scripture: "John 2:1-11",
        content: "Jesus' first recorded miracle occurred at a wedding in Cana of Galilee, a celebration that had run out of wine—a significant social embarrassment in that culture. Mary, Jesus' mother, brought this need to His attention, demonstrating her faith in His ability to help despite His initial response about His 'hour' not yet having come. The interaction between Jesus and His mother reveals both His humanity (honoring His earthly mother) and His divinity (knowing God's timing). When Jesus instructed the servants to fill six stone water jars with water—jars used for Jewish purification ceremonies—He was about to transform something ordinary into something extraordinary. Each jar held 20-30 gallons, meaning Jesus created approximately 120-180 gallons of the finest wine. The miracle wasn't just about solving a social problem; it was a sign pointing to Jesus' identity and mission. Wine in Scripture often symbolizes joy, celebration, and God's blessing. By turning water into wine, Jesus demonstrated His power over creation and foreshadowed the joy and celebration of God's kingdom. The timing is significant—this first miracle happened at a wedding, pointing to the future wedding feast of the Lamb when Christ will celebrate with His bride, the church, for eternity.",
        additionalScriptures: [
          "Isaiah 25:6 - A feast of rich food and well-aged wine",
          "Matthew 26:29 - Jesus speaks of drinking wine new in the kingdom",
          "Revelation 19:7-9 - The wedding feast of the Lamb",
          "Psalm 104:15 - Wine that gladdens human hearts",
          "Mark 2:22 - New wine in new wineskins",
          "Isaiah 55:1 - Come buy wine without money"
        ],
        questions: [
          "What does this miracle reveal about Jesus' character and His care for ordinary human needs?",
          "How does Mary's response to the servants ('Do whatever he tells you') serve as a model for us?",
          "What 'water' in your life might Jesus want to transform into 'wine'—joy, blessing, purpose?",
          "How does this miracle give you hope for God's provision in your current needs?"
        ],
        prayer: "Lord Jesus, thank You for this beautiful first miracle that reveals Your power and Your heart for people's needs. Just as You cared about the joy and celebration at that wedding, I know You care about every detail of my life. Help me to trust You with my needs, both great and small, believing that You can transform ordinary situations into extraordinary blessings. Like Mary, help me to bring my concerns to You in faith, and like the servants, help me to obey whatever You tell me to do. Transform the ordinary areas of my life into something beautiful for Your glory. Fill my life with the joy and celebration that comes from knowing You. Amen."
      }
      // Additional lessons would continue...
    ]
  },
  {
    id: 'women-of-faith',
    title: "Women of Faith",
    description: "Learn from the courage, faith, and wisdom of biblical women who shaped history and demonstrated God's power through their lives.",
    duration: 18,
    category: "Biography",
    difficulty: "All Levels",
    participants: 934,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "Mary: The Surrender of Faith",
        scripture: "Luke 1:26-38",
        content: "Mary's encounter with the angel Gabriel represents one of the most profound moments of faith in human history. A young woman, probably in her teens, living in the insignificant town of Nazareth, was chosen by God to bear the Messiah. The angel's greeting, 'Greetings, you who are highly favored! The Lord is with you,' initially troubled Mary, but Gabriel's message was even more overwhelming: she would conceive and give birth to the Son of the Most High. Mary's response reveals her character—she asked a practical question ('How will this be?') but didn't doubt God's ability to do the impossible. When the angel explained that the Holy Spirit would overshadow her, Mary's faith response was immediate: 'I am the Lord's servant. May your word to me be fulfilled.' This wasn't passive resignation but active surrender, choosing to trust God despite the enormous personal cost. She faced potential disgrace, rejection by Joseph, and social ostracism. Yet she chose to believe that nothing is impossible with God. Mary's faith teaches us that God often chooses the unlikely and unexpected to accomplish His purposes, and that true faith involves surrendering our plans to His will, even when we don't understand the full picture.",
        additionalScriptures: [
          "Luke 1:46-55 - Mary's magnificent song of praise",
          "Matthew 1:18-25 - Joseph's perspective on Mary's pregnancy",
          "Luke 2:19 - Mary treasured things in her heart",
          "John 19:25-27 - Mary at the cross",
          "Genesis 18:14 - Nothing is too hard for the Lord",
          "Isaiah 7:14 - The virgin will conceive"
        ],
        questions: [
          "What can we learn from Mary's response to unexpected and challenging news from God?",
          "How do you typically respond when God's plans seem to disrupt your own?",
          "What does Mary's faith teach us about trusting God even when we don't understand?",
          "In what areas of your life is God calling you to demonstrate Mary's kind of surrendered faith?"
        ],
        prayer: "Gracious Father, I'm amazed by Mary's faith and surrender to Your will despite the uncertainty and potential cost. Help me to have her kind of trust when You call me to step into the unknown or when Your plans seem to disrupt my own. Give me the courage to say, 'I am Your servant. May Your word to me be fulfilled,' even when I don't understand the full picture. Help me to believe that nothing is impossible with You and to trust Your goodness even in difficult circumstances. Like Mary, may I treasure Your words in my heart and respond to Your calling with faith and obedience. Use me, Lord, according to Your purposes, and help me to find joy in being Your servant. Amen."
      }
      // Additional lessons would continue...
    ]
  },
  {
    id: 'parables-kingdom',
    title: "Parables of the Kingdom",
    description: "Understand the heart of Jesus' teaching through 12 days exploring the parables that reveal the nature of God's kingdom.",
    duration: 12,
    category: "Teaching",
    difficulty: "Intermediate",
    participants: 567,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "The Sower and the Soils",
        scripture: "Matthew 13:1-23",
        content: "Jesus' parable of the sower is foundational to understanding all His parables and the nature of His kingdom. Unlike earthly kingdoms built on military might or political power, God's kingdom advances through the simple yet powerful act of sowing seed—the word of God—into human hearts. The sower represents anyone who shares God's truth, whether Jesus Himself, the apostles, pastors, or ordinary believers. The seed is consistent and good; it's the condition of the soil—the human heart—that determines the outcome. The path represents hearts hardened by sin and indifference, where Satan quickly snatches away any truth before it can take root. The rocky ground symbolizes those who receive the word with initial enthusiasm but lack deep roots; when trials come, they quickly fall away because their faith was superficial. The thorny ground depicts hearts where God's word is choked out by the worries of life, the deceitfulness of wealth, and the desires for other things. But the good soil represents hearts that are prepared, receptive, and fertile—those who hear the word, understand it, and bear fruit in varying degrees. This parable teaches us that not everyone will respond positively to the gospel, but our job is to faithfully sow the seed, trusting God for the results.",
        additionalScriptures: [
          "Mark 4:1-20 - Mark's account of the parable",
          "Luke 8:4-15 - Luke's version with additional details",
          "Isaiah 55:10-11 - God's word does not return empty",
          "1 Corinthians 3:6-9 - Paul plants, Apollos waters, God gives growth",
          "2 Timothy 4:2 - Preach the word in season and out",
          "Psalm 126:5-6 - Those who sow in tears reap with joy"
        ],
        questions: [
          "What type of soil has your heart been like in different seasons of your spiritual journey?",
          "What 'thorns' in your life might be choking out God's word and preventing spiritual growth?",
          "How can you prepare your heart to be good soil that receives and responds to God's truth?",
          "Who has God placed in your life that needs you to sow seeds of His word and love?"
        ],
        prayer: "Lord Jesus, thank You for faithfully sowing the seeds of Your truth in my heart. Help me to be good soil that receives Your word with understanding and bears fruit for Your kingdom. Remove any hardness in my heart that prevents Your truth from taking root. Give me deep roots that will sustain me through trials and difficulties. Help me to identify and remove the thorns of worry, materialism, and other desires that compete for my attention and devotion. Make me fruitful in sharing Your love and truth with others. Give me patience as I sow seeds in other people's lives, trusting You for the harvest in Your perfect timing. May my life be productive for Your glory. Amen."
      }
      // Additional lessons would continue...
    ]
  },
  {
    id: 'psalms-praise',
    title: "Psalms of Praise",
    description: "Experience the joy and wonder of worship through 16 days of studying the most celebratory psalms in Scripture.",
    duration: 16,
    category: "Worship",
    difficulty: "Beginner",
    participants: 812,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "Praise the Lord, O My Soul",
        scripture: "Psalm 103:1-22",
        content: "Psalm 103 is one of the most beloved psalms of praise, beginning with David's call to his own soul to 'praise the Lord.' The Hebrew word for praise here is 'barak,' which means to kneel or to bless. David is essentially commanding himself to worship, recognizing that sometimes we must choose to praise God regardless of our feelings or circumstances. He calls upon his entire being—'all my inmost being'—to praise God's holy name, indicating that worship should engage every part of who we are: our emotions, our will, our mind, and our spirit. The psalm then lists specific reasons for praise, beginning with personal benefits: forgiveness of sins, healing of diseases, redemption from destruction, and crowning with love and compassion. But David's praise extends beyond personal blessings to God's character—His righteousness, justice, compassion, grace, patience, and unfailing love. The central truth of this psalm is found in verses 10-12, which declare that God doesn't treat us as our sins deserve but removes our transgressions 'as far as the east is from the west.' This psalm teaches us that praise should be both personal and corporate, acknowledging both God's specific works in our lives and His eternal character that never changes.",
        additionalScriptures: [
          "Psalm 104:1 - Praise the Lord, my soul",
          "Psalm 146:1-2 - I will praise the Lord all my life",
          "Ephesians 1:3 - Praise be to God for spiritual blessings",
          "1 Peter 1:3 - Praise to God for new birth",
          "Revelation 4:11 - You are worthy to receive glory",
          "Psalm 96:1-2 - Sing to the Lord a new song"
        ],
        questions: [
          "What specific benefits has God given you that deserve your praise and thanksgiving?",
          "How does remembering God's character help you praise Him even during difficult times?",
          "What does it mean to praise God with 'all your inmost being,' and how can you do this?",
          "How can you cultivate a lifestyle of praise that extends beyond formal worship times?"
        ],
        prayer: "Praise the Lord, O my soul! All my inmost being, praise Your holy name! Thank You, Father, for Your countless benefits in my life. You have forgiven all my sins, healed my diseases, redeemed my life from destruction, and crowned me with Your love and compassion. Your character is perfect—You are compassionate and gracious, slow to anger and rich in love. Thank You for not treating me as my sins deserve but removing my transgressions as far as the east is from the west. Help me to remember Your benefits daily and to praise You not just with my lips but with my entire life. May my worship engage my heart, mind, soul, and strength. Let praise be my natural response to Your goodness and faithfulness. Amen."
      }
      // Additional lessons would continue...
    ]
  }
];

export const getUserProgress = (planId: string): { currentDay: number; completedLessons: string[] } => {
  // This would integrate with the app store
  return { currentDay: 1, completedLessons: [] };
};

export const updateLessonProgress = (planId: string, lessonId: string, completed: boolean): void => {
  // This would integrate with the app store
  console.log(`Lesson ${lessonId} in plan ${planId} marked as ${completed ? 'completed' : 'incomplete'}`);
};

export const getStudyPlanById = (id: string): StudyPlan | undefined => {
  return studyPlansDatabase.find(plan => plan.id === id);
};