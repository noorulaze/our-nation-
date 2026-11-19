import { 
  Community, 
  Event, 
  Business, 
  Place, 
  Announcement, 
  IssueReport, 
  Post, 
  Comment,
  Profile,
  UserRole,
  ModerationReport,
  ReportContentType,
  AuditLog,
  NewsArticleEntity,
  Institution,
  PublicService,
  PublicRepresentative,
  CulturalHeritageItem,
  ServiceCategory,
  ProfessionalProfile,
  ProfessionalService,
  PortfolioItem,
  Booking,
  BookingStatus,
  Review,
  Conversation,
  ChatMessage,
  SavedProfessional,
  AppNotification,
  NotificationPreferences
} from "@/types/database";
import { 
  initialCommunities, 
  initialProfiles, 
  initialEvents, 
  initialBusinesses, 
  initialPlaces, 
  initialAnnouncements, 
  initialIssueReports, 
  initialPosts,
  initialNewsArticles,
  initialInstitutions,
  initialPublicServices,
  initialRepresentatives,
  initialCulturalItems,
  initialServiceCategories,
  initialProfessionalProfiles,
  initialProfessionalServices,
  initialPortfolioItems,
  initialBookings,
  initialReviews,
  initialConversations,
  initialChatMessages,
  initialSavedProfessionals,
  initialNotifications
} from "./initialData";

class DataStore {
  private communities: Community[] = [...initialCommunities];
  private profiles: Profile[] = [...initialProfiles];
  private events: Event[] = [...initialEvents];
  private businesses: Business[] = [...initialBusinesses];
  private places: Place[] = [...initialPlaces];
  private announcements: Announcement[] = [...initialAnnouncements];
  private newsArticles: NewsArticleEntity[] = [...initialNewsArticles];
  private institutions: Institution[] = [...initialInstitutions];
  private publicServices: PublicService[] = [...initialPublicServices];
  private representatives: PublicRepresentative[] = [...initialRepresentatives];
  private culturalItems: CulturalHeritageItem[] = [...initialCulturalItems];
  private issueReports: IssueReport[] = [...initialIssueReports];
  private posts: Post[] = [...initialPosts];
  private comments: Comment[] = [
    {
      id: "c0000000-0000-0000-0000-000000000001",
      post_id: "post000-0000-0000-0000-000000000001",
      author_id: "u0000000-0000-0000-0000-000000000001",
      content: "Great initiative Anupama! Can we add a small sign board for segregation guidelines?",
      status: "published",
      created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    }
  ];
  private serviceCategories: ServiceCategory[] = [...initialServiceCategories];
  private professionals: ProfessionalProfile[] = [...initialProfessionalProfiles];
  private professionalServices: ProfessionalService[] = [...initialProfessionalServices];
  private portfolioItems: PortfolioItem[] = [...initialPortfolioItems];
  private bookings: Booking[] = [...initialBookings];
  private reviews: Review[] = [...initialReviews];
  private conversations: Conversation[] = [...initialConversations];
  private chatMessages: ChatMessage[] = [...initialChatMessages];
  private savedProfessionals: SavedProfessional[] = [...initialSavedProfessionals];
  private notifications: AppNotification[] = [...initialNotifications];
  private moderationReports: ModerationReport[] = [];
  private auditLogs: AuditLog[] = [];

  // COMMUNITIES
  getCommunities(district?: string): Community[] {
    if (!district || district === "All") {
      return this.communities;
    }
    return this.communities.filter(c => c.district.toLowerCase() === district.toLowerCase());
  }

  getCommunityById(id: string): Community | undefined {
    return this.communities.find(c => c.id === id);
  }

  getCommunityBySlug(slug: string): Community | undefined {
    return this.communities.find(c => c.slug === slug);
  }

  // POSTS
  getPosts(communityId?: string): Post[] {
    let list = this.posts.filter(p => p.status === "published");
    if (communityId) {
      list = list.filter(p => p.community_id === communityId);
    }
    // enrich with author & community
    return list
      .map(p => ({
        ...p,
        author: this.profiles.find(u => u.id === p.author_id),
        community: this.communities.find(c => c.id === p.community_id),
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  createPost(data: { community_id: string; author_id: string; content: string; media_urls?: string[] }): Post {
    const newPost: Post = {
      id: "post-" + Date.now(),
      community_id: data.community_id,
      author_id: data.author_id,
      content: data.content,
      media_urls: data.media_urls || [],
      likes_count: 0,
      comments_count: 0,
      is_pinned: false,
      status: "published",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: this.profiles.find(u => u.id === data.author_id),
      community: this.communities.find(c => c.id === data.community_id),
    };
    this.posts.unshift(newPost);
    this.addAuditLog(data.author_id, "CREATE_POST", "post", newPost.id);
    return newPost;
  }

  deletePost(id: string, actorId: string): boolean {
    const idx = this.posts.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.posts.splice(idx, 1);
      this.addAuditLog(actorId, "DELETE_POST", "post", id);
      return true;
    }
    return false;
  }

  // COMMENTS
  getComments(postId: string): Comment[] {
    return this.comments
      .filter(c => c.post_id === postId && c.status === "published")
      .map(c => ({
        ...c,
        author: this.profiles.find(u => u.id === c.author_id),
      }))
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  createComment(postId: string, authorId: string, content: string): Comment {
    const comment: Comment = {
      id: "comment-" + Date.now(),
      post_id: postId,
      author_id: authorId,
      content,
      status: "published",
      created_at: new Date().toISOString(),
      author: this.profiles.find(u => u.id === authorId),
    };
    this.comments.push(comment);

    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.comments_count = (post.comments_count || 0) + 1;
    }

    return comment;
  }

  // EVENTS
  getEvents(communityId?: string, category?: string, onlyApproved = true, includeArchived = false): Event[] {
    let list = this.events;
    if (!includeArchived) {
      list = list.filter(e => !e.archived);
    }
    if (onlyApproved) {
      list = list.filter(e => e.status === "approved");
    }
    if (communityId) {
      list = list.filter(e => e.community_id === communityId);
    }
    if (category && category !== "All" && category !== "എല്ലാം") {
      list = list.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }
    return list
      .map(e => ({
        ...e,
        community: this.communities.find(c => c.id === e.community_id),
        creator: this.profiles.find(u => u.id === e.creator_id),
      }))
      .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  }

  getEventById(id: string): Event | undefined {
    const event = this.events.find(e => e.id === id);
    if (!event) return undefined;
    return {
      ...event,
      community: this.communities.find(c => c.id === event.community_id),
      creator: this.profiles.find(u => u.id === event.creator_id),
    };
  }

  createEvent(eventData: Omit<Event, "id" | "created_at" | "status">): Event {
    const newEvent: Event = {
      ...eventData,
      id: "event-" + Date.now(),
      status: "approved", // default approved in local state
      is_verified: false,
      is_community_submitted: true,
      archived: false,
      created_at: new Date().toISOString(),
      community: this.communities.find(c => c.id === eventData.community_id),
    };
    this.events.push(newEvent);
    this.addAuditLog(eventData.creator_id, "SUBMIT_EVENT", "event", newEvent.id);
    return newEvent;
  }

  updateEvent(id: string, updates: Partial<Event>, actorId?: string): boolean {
    const e = this.events.find(item => item.id === id);
    if (e) {
      Object.assign(e, updates);
      this.addAuditLog(actorId, "UPDATE_EVENT", "event", id, updates);
      return true;
    }
    return false;
  }

  updateEventStatus(id: string, status: Event['status'], reason?: string, actorId?: string): boolean {
    const e = this.events.find(item => item.id === id);
    if (e) {
      e.status = status;
      if (reason) e.rejection_reason = reason;
      this.addAuditLog(actorId, "UPDATE_EVENT_STATUS", "event", id, { status, reason });
      return true;
    }
    return false;
  }

  archiveEvent(id: string, actorId?: string): boolean {
    const e = this.events.find(item => item.id === id);
    if (e) {
      e.archived = true;
      this.addAuditLog(actorId, "ARCHIVE_EVENT", "event", id);
      return true;
    }
    return false;
  }

  // BUSINESSES (SERVICES)
  getBusinesses(communityId?: string, category?: string, onlyApproved = true, includeArchived = false): Business[] {
    let list = this.businesses;
    if (!includeArchived) {
      list = list.filter(b => !b.archived);
    }
    if (onlyApproved) {
      list = list.filter(b => b.status === "approved");
    }
    if (communityId) {
      list = list.filter(b => b.community_id === communityId);
    }
    if (category && category !== "All") {
      list = list.filter(b => b.category.toLowerCase() === category.toLowerCase());
    }
    return list
      .map(b => ({
        ...b,
        community: this.communities.find(c => c.id === b.community_id),
      }))
      .sort((a, b) => (b.is_verified ? 1 : 0) - (a.is_verified ? 1 : 0));
  }

  getBusinessById(id: string): Business | undefined {
    const b = this.businesses.find(item => item.id === id);
    if (!b) return undefined;
    return {
      ...b,
      community: this.communities.find(c => c.id === b.community_id),
    };
  }

  createBusiness(bizData: Omit<Business, "id" | "created_at" | "status" | "is_verified">): Business {
    const newBiz: Business = {
      ...bizData,
      id: "biz-" + Date.now(),
      is_verified: false,
      is_community_submitted: true,
      status: "approved",
      archived: false,
      created_at: new Date().toISOString(),
      community: this.communities.find(c => c.id === bizData.community_id),
    };
    this.businesses.push(newBiz);
    this.addAuditLog(bizData.owner_id || "system", "REGISTER_BUSINESS", "business", newBiz.id);
    return newBiz;
  }

  updateBusiness(id: string, updates: Partial<Business>, actorId?: string): boolean {
    const b = this.businesses.find(item => item.id === id);
    if (b) {
      Object.assign(b, updates);
      this.addAuditLog(actorId, "UPDATE_BUSINESS", "business", id, updates);
      return true;
    }
    return false;
  }

  updateBusinessStatus(id: string, status: Business['status'], verified?: boolean, actorId?: string): boolean {
    const b = this.businesses.find(item => item.id === id);
    if (b) {
      b.status = status;
      if (typeof verified === "boolean") {
        b.is_verified = verified;
        if (verified) b.verified_at = new Date().toISOString().split("T")[0];
      }
      this.addAuditLog(actorId, "UPDATE_BUSINESS_STATUS", "business", id, { status, verified });
      return true;
    }
    return false;
  }

  archiveBusiness(id: string, actorId?: string): boolean {
    const b = this.businesses.find(item => item.id === id);
    if (b) {
      b.archived = true;
      this.addAuditLog(actorId, "ARCHIVE_BUSINESS", "business", id);
      return true;
    }
    return false;
  }

  // NEWS ARTICLES
  getNewsArticles(communityId?: string, onlyApproved = true, includeArchived = false): NewsArticleEntity[] {
    let list = this.newsArticles;
    if (!includeArchived) {
      list = list.filter(n => !n.archived);
    }
    if (onlyApproved) {
      list = list.filter(n => n.status === "approved");
    }
    if (communityId) {
      list = list.filter(n => n.community_id === communityId);
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  getNewsArticleById(id: string): NewsArticleEntity | undefined {
    return this.newsArticles.find(n => n.id === id);
  }

  createNewsArticle(data: Omit<NewsArticleEntity, "id" | "created_at" | "archived">, actorId?: string): NewsArticleEntity {
    const item: NewsArticleEntity = {
      ...data,
      id: "news-" + Date.now(),
      archived: false,
      created_at: new Date().toISOString(),
    };
    this.newsArticles.unshift(item);
    this.addAuditLog(actorId, "CREATE_NEWS_ARTICLE", "news", item.id);
    return item;
  }

  updateNewsArticle(id: string, updates: Partial<NewsArticleEntity>, actorId?: string): boolean {
    const n = this.newsArticles.find(item => item.id === id);
    if (n) {
      Object.assign(n, updates);
      this.addAuditLog(actorId, "UPDATE_NEWS_ARTICLE", "news", id, updates);
      return true;
    }
    return false;
  }

  archiveNewsArticle(id: string, actorId?: string): boolean {
    const n = this.newsArticles.find(item => item.id === id);
    if (n) {
      n.archived = true;
      n.status = "archived";
      this.addAuditLog(actorId, "ARCHIVE_NEWS_ARTICLE", "news", id);
      return true;
    }
    return false;
  }

  // INSTITUTIONS
  getInstitutions(communityId?: string, type?: string, includeArchived = false): Institution[] {
    let list = this.institutions;
    if (!includeArchived) {
      list = list.filter(i => !i.archived);
    }
    if (communityId) {
      list = list.filter(i => i.community_id === communityId);
    }
    if (type && type !== "All" && type !== "എല്ലാം") {
      list = list.filter(i => i.type.toLowerCase() === type.toLowerCase());
    }
    return list.sort((a, b) => (b.is_verified ? 1 : 0) - (a.is_verified ? 1 : 0));
  }

  getInstitutionById(id: string): Institution | undefined {
    return this.institutions.find(i => i.id === id);
  }

  createInstitution(data: Omit<Institution, "id" | "created_at" | "archived">, actorId?: string): Institution {
    const item: Institution = {
      ...data,
      id: "inst-" + Date.now(),
      archived: false,
      created_at: new Date().toISOString(),
    };
    this.institutions.push(item);
    this.addAuditLog(actorId, "CREATE_INSTITUTION", "institution", item.id);
    return item;
  }

  updateInstitution(id: string, updates: Partial<Institution>, actorId?: string): boolean {
    const item = this.institutions.find(i => i.id === id);
    if (item) {
      Object.assign(item, updates);
      this.addAuditLog(actorId, "UPDATE_INSTITUTION", "institution", id, updates);
      return true;
    }
    return false;
  }

  archiveInstitution(id: string, actorId?: string): boolean {
    const item = this.institutions.find(i => i.id === id);
    if (item) {
      item.archived = true;
      this.addAuditLog(actorId, "ARCHIVE_INSTITUTION", "institution", id);
      return true;
    }
    return false;
  }

  // PUBLIC SERVICES & EMERGENCY
  getPublicServices(communityId?: string, category?: string, includeArchived = false): PublicService[] {
    let list = this.publicServices;
    if (!includeArchived) {
      list = list.filter(s => !s.archived);
    }
    if (communityId) {
      list = list.filter(s => s.community_id === communityId);
    }
    if (category && category !== "all" && category !== "All") {
      list = list.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }
    return list;
  }

  getPublicServiceById(id: string): PublicService | undefined {
    return this.publicServices.find(s => s.id === id);
  }

  createPublicService(data: Omit<PublicService, "id" | "created_at" | "archived">, actorId?: string): PublicService {
    const item: PublicService = {
      ...data,
      id: "srv-" + Date.now(),
      archived: false,
      created_at: new Date().toISOString(),
    };
    this.publicServices.push(item);
    this.addAuditLog(actorId, "CREATE_PUBLIC_SERVICE", "service", item.id);
    return item;
  }

  updatePublicService(id: string, updates: Partial<PublicService>, actorId?: string): boolean {
    const item = this.publicServices.find(s => s.id === id);
    if (item) {
      Object.assign(item, updates);
      this.addAuditLog(actorId, "UPDATE_PUBLIC_SERVICE", "service", id, updates);
      return true;
    }
    return false;
  }

  archivePublicService(id: string, actorId?: string): boolean {
    const item = this.publicServices.find(s => s.id === id);
    if (item) {
      item.archived = true;
      this.addAuditLog(actorId, "ARCHIVE_PUBLIC_SERVICE", "service", id);
      return true;
    }
    return false;
  }

  // PUBLIC REPRESENTATIVES
  getRepresentatives(communityId?: string): PublicRepresentative[] {
    if (communityId) {
      return this.representatives.filter(r => r.community_id === communityId);
    }
    return this.representatives;
  }

  getRepresentativeById(id: string): PublicRepresentative | undefined {
    return this.representatives.find(r => r.id === id);
  }

  updateRepresentative(id: string, updates: Partial<PublicRepresentative>, actorId?: string): boolean {
    const item = this.representatives.find(r => r.id === id);
    if (item) {
      Object.assign(item, updates);
      this.addAuditLog(actorId, "UPDATE_REPRESENTATIVE", "representative", id, updates);
      return true;
    }
    return false;
  }

  // CULTURAL HERITAGE ITEMS
  getCulturalItems(communityId?: string): CulturalHeritageItem[] {
    if (communityId) {
      return this.culturalItems.filter(c => c.community_id === communityId);
    }
    return this.culturalItems;
  }

  // PLACES
  getPlaces(communityId?: string): Place[] {
    let list = this.places;
    if (communityId) {
      list = list.filter(p => p.community_id === communityId);
    }
    return list.map(p => ({
      ...p,
      community: this.communities.find(c => c.id === p.community_id),
    }));
  }

  // ANNOUNCEMENTS
  getAnnouncements(communityId?: string, onlyApproved = true): Announcement[] {
    let list = this.announcements;
    if (onlyApproved) {
      list = list.filter(a => a.status === "approved");
    }
    if (communityId) {
      list = list.filter(a => a.community_id === communityId);
    }
    return list
      .map(a => ({
        ...a,
        community: this.communities.find(c => c.id === a.community_id),
        publisher: this.profiles.find(u => u.id === a.publisher_id),
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  createAnnouncement(data: Omit<Announcement, "id" | "created_at" | "status">): Announcement {
    const announcement: Announcement = {
      ...data,
      id: "ann-" + Date.now(),
      status: "approved",
      created_at: new Date().toISOString(),
      community: this.communities.find(c => c.id === data.community_id),
      publisher: this.profiles.find(u => u.id === data.publisher_id),
    };
    this.announcements.unshift(announcement);
    this.addAuditLog(data.publisher_id, "PUBLISH_ANNOUNCEMENT", "announcement", announcement.id);
    return announcement;
  }

  // ISSUE REPORTS
  getIssueReports(communityId?: string, reporterId?: string): IssueReport[] {
    let list = this.issueReports;
    if (communityId) {
      list = list.filter(i => i.community_id === communityId);
    }
    if (reporterId) {
      list = list.filter(i => i.reporter_id === reporterId);
    }
    return list
      .map(i => ({
        ...i,
        community: this.communities.find(c => c.id === i.community_id),
        reporter: this.profiles.find(u => u.id === i.reporter_id),
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  getIssueReportById(id: string): IssueReport | undefined {
    const issue = this.issueReports.find(i => i.id === id);
    if (!issue) return undefined;
    return {
      ...issue,
      community: this.communities.find(c => c.id === issue.community_id),
      reporter: this.profiles.find(u => u.id === issue.reporter_id),
    };
  }

  createIssueReport(data: Omit<IssueReport, "id" | "created_at" | "status" | "status_updated_at">): IssueReport {
    const issue: IssueReport = {
      ...data,
      id: "issue-" + Date.now(),
      status: "submitted",
      status_updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      community: this.communities.find(c => c.id === data.community_id),
      reporter: this.profiles.find(u => u.id === data.reporter_id),
    };
    this.issueReports.unshift(issue);
    this.addAuditLog(data.reporter_id, "SUBMIT_ISSUE", "issue", issue.id);
    return issue;
  }

  updateIssueStatus(id: string, status: IssueReport['status'], officialResponse?: string, actorId?: string): boolean {
    const issue = this.issueReports.find(i => i.id === id);
    if (issue) {
      issue.status = status;
      if (officialResponse) issue.official_response = officialResponse;
      issue.status_updated_at = new Date().toISOString();
      issue.status_updated_by = actorId;
      this.addAuditLog(actorId, "UPDATE_ISSUE_STATUS", "issue", id, { status, officialResponse });
      return true;
    }
    return false;
  }

  // PLACES MANAGEMENT
  updatePlace(id: string, updates: Partial<Place>, actorId?: string): boolean {
    const item = this.places.find(p => p.id === id);
    if (item) {
      Object.assign(item, updates);
      this.addAuditLog(actorId, "UPDATE_PLACE", "place", id, updates);
      return true;
    }
    return false;
  }

  archivePlace(id: string, actorId?: string): boolean {
    const item = this.places.find(p => p.id === id);
    if (item) {
      item.archived = true;
      this.addAuditLog(actorId, "ARCHIVE_PLACE", "place", id);
      return true;
    }
    return false;
  }

  // ANNOUNCEMENTS MANAGEMENT
  updateAnnouncement(id: string, updates: Partial<Announcement>, actorId?: string): boolean {
    const item = this.announcements.find(a => a.id === id);
    if (item) {
      Object.assign(item, updates);
      this.addAuditLog(actorId, "UPDATE_ANNOUNCEMENT", "announcement", id, updates);
      return true;
    }
    return false;
  }

  archiveAnnouncement(id: string, actorId?: string): boolean {
    const item = this.announcements.find(a => a.id === id);
    if (item) {
      item.archived = true;
      item.status = "expired";
      this.addAuditLog(actorId, "ARCHIVE_ANNOUNCEMENT", "announcement", id);
      return true;
    }
    return false;
  }

  // UNIFIED VERIFICATION HELPER
  verifyEntity(targetType: string, id: string, sourceUrl: string, sourceName: string, actorId?: string): boolean {
    const today = new Date().toISOString().split("T")[0];
    if (targetType === "event") {
      const e = this.events.find(item => item.id === id);
      if (e) {
        e.is_verified = true;
        e.source_url = sourceUrl;
        e.source_name = sourceName;
        e.verified_at = today;
        this.addAuditLog(actorId, "VERIFY_EVENT", "event", id, { sourceUrl, sourceName });
        return true;
      }
    } else if (targetType === "business") {
      const b = this.businesses.find(item => item.id === id);
      if (b) {
        b.is_verified = true;
        b.source_url = sourceUrl;
        b.source_name = sourceName;
        b.verified_at = today;
        this.addAuditLog(actorId, "VERIFY_BUSINESS", "business", id, { sourceUrl, sourceName });
        return true;
      }
    } else if (targetType === "news") {
      const n = this.newsArticles.find(item => item.id === id);
      if (n) {
        n.is_verified = true;
        n.source_url = sourceUrl;
        n.source_name = sourceName;
        n.verified_at = today;
        this.addAuditLog(actorId, "VERIFY_NEWS", "news", id, { sourceUrl, sourceName });
        return true;
      }
    } else if (targetType === "institution") {
      const inst = this.institutions.find(item => item.id === id);
      if (inst) {
        inst.is_verified = true;
        inst.source_url = sourceUrl;
        inst.source_name = sourceName;
        inst.verified_at = today;
        this.addAuditLog(actorId, "VERIFY_INSTITUTION", "institution", id, { sourceUrl, sourceName });
        return true;
      }
    } else if (targetType === "service") {
      const srv = this.publicServices.find(item => item.id === id);
      if (srv) {
        srv.is_verified = true;
        srv.source_url = sourceUrl;
        srv.source_name = sourceName;
        srv.verified_at = today;
        this.addAuditLog(actorId, "VERIFY_SERVICE", "service", id, { sourceUrl, sourceName });
        return true;
      }
    } else if (targetType === "issue") {
      const iss = this.issueReports.find(item => item.id === id);
      if (iss) {
        iss.is_verified = true;
        iss.source_url = sourceUrl;
        iss.verified_at = today;
        this.addAuditLog(actorId, "VERIFY_ISSUE", "issue", id, { sourceUrl, sourceName });
        return true;
      }
    }
    return false;
  }

  // PLATFORM VERIFICATION & HEALTH STATS
  getVerificationStats() {
    const totalNews = this.newsArticles.length;
    const verifiedNews = this.newsArticles.filter(n => n.is_verified).length;
    const totalEvents = this.events.length;
    const verifiedEvents = this.events.filter(e => e.is_verified).length;
    const totalBiz = this.businesses.length;
    const verifiedBiz = this.businesses.filter(b => b.is_verified).length;
    const totalInst = this.institutions.length;
    const verifiedInst = this.institutions.filter(i => i.is_verified).length;
    const totalSrv = this.publicServices.length;
    const verifiedSrv = this.publicServices.filter(s => s.is_verified).length;

    const totalRecords = totalNews + totalEvents + totalBiz + totalInst + totalSrv;
    const totalVerified = verifiedNews + verifiedEvents + verifiedBiz + verifiedInst + verifiedSrv;
    const percentVerified = totalRecords > 0 ? Math.round((totalVerified / totalRecords) * 100) : 100;

    const pendingSubmissions = 
      this.events.filter(e => e.status === "pending").length +
      this.businesses.filter(b => b.status === "pending").length +
      this.newsArticles.filter(n => n.status === "pending").length;

    return {
      totalRecords,
      totalVerified,
      percentVerified,
      pendingSubmissions,
      totalNews,
      verifiedNews,
      totalEvents,
      verifiedEvents,
      totalBiz,
      verifiedBiz,
      totalInst,
      verifiedInst,
      totalSrv,
      verifiedSrv,
    };
  }
  getProfiles(): Profile[] {
    return this.profiles;
  }

  getProfileById(id: string): Profile | undefined {
    return this.profiles.find(p => p.id === id);
  }

  updateProfile(id: string, updates: Partial<Profile>): Profile | undefined {
    const p = this.profiles.find(item => item.id === id);
    if (p) {
      // SECURITY: Disallow self-role modification through updateProfile
      const { role: _forbiddenRole, ...safeUpdates } = updates as any;
      Object.assign(p, safeUpdates, { updated_at: new Date().toISOString() });
      return p;
    }
    return undefined;
  }

  /**
   * Secure Administrative Role Assignment
   * Enforces that only verified administrators can modify a user's role.
   * Generates immutable audit logs for all attempts (both authorized and rejected).
   */
  assignUserRole(
    adminUserId: string,
    targetUserId: string,
    newRole: UserRole,
    reason: string
  ): { success: boolean; error?: string; profile?: Profile } {
    // 1. Verify caller exists and holds the admin role
    const caller = this.profiles.find(p => p.id === adminUserId);
    if (!caller || caller.role !== "admin") {
      this.addAuditLog(
        adminUserId || "unauthenticated",
        "UNAUTHORIZED_ROLE_CHANGE_ATTEMPT",
        "profile",
        targetUserId,
        {
          attempted_role: newRole,
          caller_role: caller?.role || "unauthenticated",
          caller_username: caller?.username || "unknown",
          reason: reason || "Unspecified"
        }
      );
      return { 
        success: false, 
        error: "Access Denied: Only platform administrators can assign or modify user roles." 
      };
    }

    // 2. Validate target role
    const validRoles: UserRole[] = ["user", "moderator", "verified_org", "admin"];
    if (!validRoles.includes(newRole)) {
      return { 
        success: false, 
        error: `Invalid role specified: ${newRole}. Valid roles are: ${validRoles.join(", ")}` 
      };
    }

    // 3. Find target user
    const target = this.profiles.find(p => p.id === targetUserId);
    if (!target) {
      return { success: false, error: "Target user not found." };
    }

    const previousRole = target.role;
    target.role = newRole;
    target.updated_at = new Date().toISOString();

    // 4. Log role change event in immutable audit log
    this.addAuditLog(
      adminUserId,
      "ASSIGN_USER_ROLE",
      "profile",
      targetUserId,
      {
        target_username: target.username,
        previous_role: previousRole,
        new_role: newRole,
        reason: reason || "Administrative update",
        admin_username: caller.username
      }
    );

    return { success: true, profile: target };
  }

  // AUDIT LOGS
  addAuditLog(actorId: string | undefined, action: string, targetType: string, targetId: string, details?: Record<string, any>) {
    this.auditLogs.unshift({
      id: "audit-" + Date.now(),
      actor_id: actorId || null,
      action,
      target_type: targetType,
      target_id: targetId,
      details: details || null,
      created_at: new Date().toISOString(),
    });
  }

  getAuditLogs(): AuditLog[] {
    return this.auditLogs.slice(0, 50);
  }

  // MODERATION REPORTS
  reportContent(
    reporterId: string | undefined,
    contentType: ReportContentType,
    contentId: string,
    reason: string,
    details?: string
  ): ModerationReport {
    const report: ModerationReport = {
      id: "rep-" + Date.now(),
      reporter_id: reporterId || "anonymous",
      content_type: contentType,
      content_id: contentId,
      reason,
      details: details || null,
      status: "pending",
      created_at: new Date().toISOString(),
      reporter: reporterId ? this.profiles.find(p => p.id === reporterId) : undefined,
    };
    this.moderationReports.unshift(report);
    this.addAuditLog(reporterId, "REPORT_CONTENT", contentType, contentId, { reason, details });
    return report;
  }

  getModerationReports(): ModerationReport[] {
    return this.moderationReports.map(r => ({
      ...r,
      reporter: r.reporter_id ? this.profiles.find(p => p.id === r.reporter_id) : undefined,
    }));
  }

  updateModerationReportStatus(reportId: string, status: 'reviewed' | 'dismissed' | 'actioned', reviewerId?: string): boolean {
    const rep = this.moderationReports.find(r => r.id === reportId);
    if (rep) {
      rep.status = status;
      rep.reviewed_by = reviewerId || null;
      this.addAuditLog(reviewerId, "UPDATE_REPORT_STATUS", "report", reportId, { status });
      return true;
    }
    return false;
  }


  // ==========================================
  // SERVICE CATEGORIES
  // ==========================================
  getServiceCategories(): ServiceCategory[] {
    return [...this.serviceCategories].sort((a, b) => a.display_order - b.display_order);
  }

  getCategoryBySlug(slug: string): ServiceCategory | undefined {
    return this.serviceCategories.find(c => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase());
  }

  addServiceCategory(cat: Omit<ServiceCategory, 'id'>): ServiceCategory {
    const newCat: ServiceCategory = {
      ...cat,
      id: "cat-" + cat.slug,
    };
    this.serviceCategories.push(newCat);
    this.addAuditLog(undefined, "CREATE_CATEGORY", "category", newCat.id, { name: cat.name });
    return newCat;
  }

  updateServiceCategory(id: string, updates: Partial<ServiceCategory>): boolean {
    const cat = this.serviceCategories.find(c => c.id === id);
    if (cat) {
      Object.assign(cat, updates);
      return true;
    }
    return false;
  }

  // ==========================================
  // PROFESSIONALS
  // ==========================================
  getProfessionals(filters?: {
    categorySlug?: string;
    categoryId?: string;
    locality?: string;
    minRating?: number;
    verifiedOnly?: boolean;
    search?: string;
    sort?: 'rating' | 'reviews' | 'price_asc' | 'price_desc';
  }): ProfessionalProfile[] {
    let list = [...this.professionals];

    if (filters?.categorySlug && filters.categorySlug !== "all") {
      const cat = this.getCategoryBySlug(filters.categorySlug);
      if (cat) {
        list = list.filter(p => p.category_id === cat.id || p.category_id === cat.slug);
      }
    }

    if (filters?.categoryId && filters.categoryId !== "all") {
      list = list.filter(p => p.category_id === filters.categoryId);
    }

    if (filters?.locality && filters.locality !== "all" && filters.locality !== "All") {
      const loc = filters.locality.toLowerCase();
      list = list.filter(p => 
        p.locality.toLowerCase().includes(loc) ||
        p.service_areas.some(a => a.toLowerCase().includes(loc))
      );
    }

    if (filters?.minRating) {
      list = list.filter(p => p.rating >= (filters.minRating || 0));
    }

    if (filters?.verifiedOnly) {
      list = list.filter(p => p.is_verified);
    }

    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(p =>
        p.display_name.toLowerCase().includes(q) ||
        (p.display_name_ml && p.display_name_ml.includes(q)) ||
        (p.business_name && p.business_name.toLowerCase().includes(q)) ||
        (p.category_name && p.category_name.toLowerCase().includes(q)) ||
        (p.category_name_ml && p.category_name_ml.includes(q)) ||
        p.subcategories.some(s => s.toLowerCase().includes(q)) ||
        p.locality.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (filters?.sort === 'price_asc') {
      list.sort((a, b) => a.starting_price - b.starting_price);
    } else if (filters?.sort === 'price_desc') {
      list.sort((a, b) => b.starting_price - a.starting_price);
    } else if (filters?.sort === 'reviews') {
      list.sort((a, b) => b.reviews_count - a.reviews_count);
    } else {
      // default: highest rating
      list.sort((a, b) => b.rating - a.rating || b.reviews_count - a.reviews_count);
    }

    return list;
  }

  getProfessionalById(id: string): ProfessionalProfile | undefined {
    return this.professionals.find(p => p.id === id);
  }

  getProfessionalByUsername(username: string): ProfessionalProfile | undefined {
    return this.professionals.find(p => p.username.toLowerCase() === username.toLowerCase());
  }

  getProfessionalByUserId(userId: string): ProfessionalProfile | undefined {
    return this.professionals.find(p => p.user_id === userId);
  }

  createProfessionalProfile(data: Omit<ProfessionalProfile, 'id' | 'rating' | 'reviews_count' | 'created_at' | 'updated_at'>): ProfessionalProfile {
    const newPro: ProfessionalProfile = {
      ...data,
      id: "pro-" + Date.now(),
      rating: 5.0,
      reviews_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.professionals.push(newPro);

    // Also mark the user profile as professional
    const userProfile = this.profiles.find(p => p.id === data.user_id);
    if (userProfile) {
      userProfile.is_professional = true;
    }

    this.addAuditLog(data.user_id, "REGISTER_PROFESSIONAL", "professional", newPro.id, {
      name: newPro.display_name,
      category: newPro.category_name,
    });

    return newPro;
  }

  updateProfessionalProfile(id: string, updates: Partial<ProfessionalProfile>): ProfessionalProfile | undefined {
    const pro = this.professionals.find(p => p.id === id);
    if (pro) {
      Object.assign(pro, updates, { updated_at: new Date().toISOString() });
      return pro;
    }
    return undefined;
  }

  verifyProfessional(id: string, actorId?: string): boolean {
    const pro = this.professionals.find(p => p.id === id);
    if (pro) {
      pro.is_verified = true;
      pro.verification_status = "verified";
      if (!pro.badges.includes("verified_pro")) {
        pro.badges.unshift("verified_pro");
      }
      this.addAuditLog(actorId, "VERIFY_PROFESSIONAL", "professional", id, { name: pro.display_name });
      return true;
    }
    return false;
  }

  // ==========================================
  // SERVICES OFFERED
  // ==========================================
  getServicesByProfessional(proId: string): ProfessionalService[] {
    return this.professionalServices.filter(s => s.professional_id === proId && s.is_active);
  }

  getAllServicesByProfessional(proId: string): ProfessionalService[] {
    return this.professionalServices.filter(s => s.professional_id === proId);
  }

  addProfessionalService(data: Omit<ProfessionalService, 'id' | 'created_at'>): ProfessionalService {
    const srv: ProfessionalService = {
      ...data,
      id: "srv-" + Date.now(),
      created_at: new Date().toISOString(),
    };
    this.professionalServices.push(srv);
    return srv;
  }

  updateProfessionalService(id: string, updates: Partial<ProfessionalService>): boolean {
    const srv = this.professionalServices.find(s => s.id === id);
    if (srv) {
      Object.assign(srv, updates);
      return true;
    }
    return false;
  }

  deleteProfessionalService(id: string): boolean {
    const idx = this.professionalServices.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.professionalServices.splice(idx, 1);
      return true;
    }
    return false;
  }

  // ==========================================
  // PORTFOLIO ITEMS
  // ==========================================
  getPortfolioItems(proId: string): PortfolioItem[] {
    return this.portfolioItems.filter(p => p.professional_id === proId);
  }

  addPortfolioItem(data: Omit<PortfolioItem, 'id'>): PortfolioItem {
    const item: PortfolioItem = {
      ...data,
      id: "port-" + Date.now(),
    };
    this.portfolioItems.push(item);
    return item;
  }

  deletePortfolioItem(id: string): boolean {
    const idx = this.portfolioItems.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.portfolioItems.splice(idx, 1);
      return true;
    }
    return false;
  }

  // ==========================================
  // BOOKINGS & SCHEDULING
  // ==========================================
  isSlotAvailable(professionalId: string, date: string, timeSlot: string): boolean {
    const pro = this.getProfessionalById(professionalId);
    if (!pro) return false;

    // Check blocked dates
    if (pro.availability.blockedDates && pro.availability.blockedDates.includes(date)) {
      return false;
    }

    // Check day of week
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase() as keyof typeof pro.availability.days;
    const daySchedule = pro.availability.days[dayOfWeek];
    if (daySchedule && !daySchedule.enabled) {
      return false;
    }

    // Check existing active bookings for collision
    const collision = this.bookings.some(b => 
      b.professional_id === professionalId &&
      b.booking_date === date &&
      b.time_slot.trim().toLowerCase() === timeSlot.trim().toLowerCase() &&
      ['pending', 'accepted', 'confirmed', 'in_progress'].includes(b.status)
    );

    return !collision;
  }

  getBookings(filter?: { customerId?: string; professionalId?: string; status?: BookingStatus }): Booking[] {
    let list = [...this.bookings];

    if (filter?.customerId) {
      list = list.filter(b => b.customer_id === filter.customerId);
    }
    if (filter?.professionalId) {
      list = list.filter(b => b.professional_id === filter.professionalId);
    }
    if (filter?.status) {
      list = list.filter(b => b.status === filter.status);
    }

    // Enrich with customer and professional
    return list.map(b => ({
      ...b,
      customer: this.profiles.find(p => p.id === b.customer_id),
      professional: this.professionals.find(p => p.id === b.professional_id),
    })).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  getBookingById(id: string): Booking | undefined {
    const b = this.bookings.find(item => item.id === id || item.booking_number === id);
    if (!b) return undefined;
    return {
      ...b,
      customer: this.profiles.find(p => p.id === b.customer_id),
      professional: this.professionals.find(p => p.id === b.professional_id),
    };
  }

  createBooking(data: Omit<Booking, 'id' | 'booking_number' | 'status' | 'created_at' | 'updated_at'>): { success: boolean; booking?: Booking; error?: string } {
    // 1. Conflict check
    if (!this.isSlotAvailable(data.professional_id, data.booking_date, data.time_slot)) {
      return { success: false, error: "The selected time slot is already booked or unavailable. Please choose another slot." };
    }

    const count = this.bookings.length + 1001;
    const newBooking: Booking = {
      ...data,
      id: "bk-" + Date.now(),
      booking_number: `BK-TAN-${count}`,
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.bookings.push(newBooking);

    // Notify professional
    const pro = this.getProfessionalById(data.professional_id);
    if (pro) {
      this.addNotification({
        user_id: pro.user_id,
        title: "New Booking Request",
        title_ml: "പുതിയ സേവന ബുക്കിംഗ്",
        message: `${data.customer_name} requested ${data.service_title} for ${data.booking_date} at ${data.time_slot}.`,
        message_ml: `${data.customer_name} ${data.booking_date} തീയതിയിൽ (${data.time_slot}) സേവനത്തിനായി ബുക്ക് ചെയ്തിരിക്കുന്നു.`,
        type: "booking_request",
        link: "/dashboard/bookings",
      });
    }

    this.addAuditLog(data.customer_id, "CREATE_BOOKING", "booking", newBooking.id, {
      booking_number: newBooking.booking_number,
      service: data.service_title,
    });

    return { success: true, booking: newBooking };
  }

  updateBookingStatus(id: string, status: BookingStatus, reason?: string, actorId?: string): boolean {
    const booking = this.bookings.find(b => b.id === id || b.booking_number === id);
    if (!booking) return false;

    const oldStatus = booking.status;
    booking.status = status;
    booking.updated_at = new Date().toISOString();

    if (status === "declined" && reason) {
      booking.decline_reason = reason;
    }
    if (status === "cancelled" && reason) {
      booking.cancellation_reason = reason;
    }

    // Send notifications based on status change
    const pro = this.getProfessionalById(booking.professional_id);

    if (status === "accepted" || status === "confirmed") {
      this.addNotification({
        user_id: booking.customer_id,
        title: "Booking Accepted",
        title_ml: "ബുക്കിംഗ് സ്വീകരിച്ചു",
        message: `${pro?.display_name || "Provider"} accepted your booking for ${booking.booking_date}.`,
        message_ml: `${pro?.display_name || "സർവീസ് പ്രൊവൈഡർ"} നിങ്ങളുടെ ബുക്കിംഗ് സ്വീകരിച്ചു.`,
        type: "booking_accepted",
        link: "/dashboard/bookings",
      });
    } else if (status === "declined") {
      this.addNotification({
        user_id: booking.customer_id,
        title: "Booking Declined",
        title_ml: "ബുക്കിംഗ് നിരസിച്ചു",
        message: `Booking ${booking.booking_number} was declined${reason ? `: ${reason}` : "."}`,
        message_ml: `നിങ്ങളുടെ ബുക്കിംഗ് നിരസിക്കപ്പെട്ടു${reason ? `: ${reason}` : "."}`,
        type: "booking_declined",
        link: "/dashboard/bookings",
      });
    } else if (status === "completed") {
      this.addNotification({
        user_id: booking.customer_id,
        title: "Service Completed - Leave a Review",
        title_ml: "സേവനം പൂർത്തിയായി - റേറ്റിംഗ് നൽകൂ",
        message: `Your service ${booking.service_title} is complete. Share your feedback!`,
        message_ml: `${booking.service_title} സേവനം പൂർത്തിയായി. ദയവായി നിങ്ങളുടെ വിലയിരുത്തൽ രേഖപ്പെടുത്തൂ.`,
        type: "booking_completed",
        link: `/dashboard/bookings?review=${booking.id}`,
      });
    }

    this.addAuditLog(actorId, "UPDATE_BOOKING_STATUS", "booking", booking.id, {
      from: oldStatus,
      to: status,
      reason,
    });

    return true;
  }

  rescheduleBooking(id: string, newDate: string, newSlot: string, actorId?: string): { success: boolean; error?: string } {
    const booking = this.bookings.find(b => b.id === id || b.booking_number === id);
    if (!booking) return { success: false, error: "Booking not found" };

    if (!this.isSlotAvailable(booking.professional_id, newDate, newSlot)) {
      return { success: false, error: "Requested slot is not available." };
    }

    booking.status = "rescheduled";
    booking.rescheduled_date = newDate;
    booking.rescheduled_slot = newSlot;
    booking.booking_date = newDate;
    booking.time_slot = newSlot;
    booking.updated_at = new Date().toISOString();

    // Notify customer
    this.addNotification({
      user_id: booking.customer_id,
      title: "Booking Rescheduled",
      title_ml: "ബുക്കിംഗ് സമയം മാറ്റി",
      message: `Your booking was rescheduled to ${newDate} at ${newSlot}.`,
      message_ml: `നിങ്ങളുടെ ബുക്കിംഗ് ${newDate} (${newSlot}) സമയത്തേക്ക് മാറ്റിയിരിക്കുന്നു.`,
      type: "booking_rescheduled",
      link: "/dashboard/bookings",
    });

    this.addAuditLog(actorId, "RESCHEDULE_BOOKING", "booking", booking.id, {
      newDate,
      newSlot,
    });

    return { success: true };
  }

  // ==========================================
  // REVIEWS & RATINGS (MODULE 9)
  // ==========================================
  getReviews(professionalId?: string): Review[] {
    let list = [...this.reviews];
    if (professionalId) {
      list = list.filter(r => r.professional_id === professionalId);
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  canUserReview(userId: string, bookingId: string): { eligible: boolean; reason?: string } {
    const booking = this.bookings.find(b => b.id === bookingId || b.booking_number === bookingId);
    if (!booking) {
      return { eligible: false, reason: "Booking does not exist." };
    }
    if (booking.customer_id !== userId) {
      return { eligible: false, reason: "Only the customer who booked the service can review." };
    }
    if (booking.status !== "completed") {
      return { eligible: false, reason: "Reviews can only be submitted after service completion." };
    }
    const alreadyReviewed = this.reviews.some(r => r.booking_id === booking.id);
    if (alreadyReviewed) {
      return { eligible: false, reason: "You have already reviewed this booking." };
    }
    return { eligible: true };
  }

  createReview(data: {
    booking_id: string;
    professional_id: string;
    customer_id: string;
    customer_name: string;
    customer_avatar?: string | null;
    rating_overall: number;
    rating_punctuality?: number;
    rating_quality?: number;
    rating_value?: number;
    comment: string;
    work_photo_url?: string | null;
  }): { success: boolean; review?: Review; error?: string } {
    const check = this.canUserReview(data.customer_id, data.booking_id);
    if (!check.eligible) {
      return { success: false, error: check.reason };
    }

    const newRev: Review = {
      ...data,
      id: "rev-" + Date.now(),
      is_verified_booking: true,
      created_at: new Date().toISOString(),
    };

    this.reviews.push(newRev);

    // Recalculate professional overall rating & reviews count
    const proReviews = this.reviews.filter(r => r.professional_id === data.professional_id);
    const avgRating = Number((proReviews.reduce((sum, r) => sum + r.rating_overall, 0) / proReviews.length).toFixed(1));
    
    const pro = this.professionals.find(p => p.id === data.professional_id);
    if (pro) {
      pro.rating = avgRating;
      pro.reviews_count = proReviews.length;

      // Notify professional
      this.addNotification({
        user_id: pro.user_id,
        title: "New Review Received",
        title_ml: "പുതിയ റേറ്റിംഗ് ലഭിച്ചു",
        message: `${data.customer_name} rated your service ${data.rating_overall} stars.`,
        message_ml: `${data.customer_name} നിങ്ങളുടെ സേവനത്തിന് ${data.rating_overall} സ്റ്റാർ റേറ്റിംഗ് നൽകി.`,
        type: "new_review",
        link: `/professionals/${pro.username}`,
      });
    }

    this.addAuditLog(data.customer_id, "CREATE_REVIEW", "review", newRev.id, {
      rating: data.rating_overall,
      professional: data.professional_id,
    });

    return { success: true, review: newRev };
  }

  replyToReview(reviewId: string, reply: string, professionalId: string): boolean {
    const rev = this.reviews.find(r => r.id === reviewId && r.professional_id === professionalId);
    if (rev) {
      rev.provider_reply = reply;
      rev.provider_replied_at = new Date().toISOString();
      return true;
    }
    return false;
  }

  // ==========================================
  // CONVERSATIONS & CHAT (MODULE 8)
  // ==========================================
  getConversations(userId: string): Conversation[] {
    return this.conversations.filter(c => c.customer_id === userId || c.professional_id === userId);
  }

  getConversationById(id: string): Conversation | undefined {
    return this.conversations.find(c => c.id === id);
  }

  getOrCreateConversationForBooking(bookingId: string): Conversation {
    const existing = this.conversations.find(c => c.booking_id === bookingId);
    if (existing) return existing;

    const booking = this.getBookingById(bookingId);
    const pro = booking ? this.getProfessionalById(booking.professional_id) : undefined;

    const newConv: Conversation = {
      id: "conv-" + Date.now(),
      booking_id: bookingId,
      customer_id: booking?.customer_id || "u0000000-0000-0000-0000-000000000001",
      professional_id: pro?.id || "pro-001",
      professional_name: pro?.display_name || "Service Provider",
      customer_name: booking?.customer_name || "Customer",
      unread_count_customer: 0,
      unread_count_professional: 0,
      created_at: new Date().toISOString(),
    };
    this.conversations.push(newConv);
    return newConv;
  }

  getChatMessages(conversationId: string): ChatMessage[] {
    return this.chatMessages.filter(m => m.conversation_id === conversationId);
  }

  sendChatMessage(conversationId: string, senderId: string, senderName: string, content: string): ChatMessage {
    const msg: ChatMessage = {
      id: "msg-" + Date.now(),
      conversation_id: conversationId,
      sender_id: senderId,
      sender_name: senderName,
      content,
      created_at: new Date().toISOString(),
      is_read: false,
    };
    this.chatMessages.push(msg);

    const conv = this.conversations.find(c => c.id === conversationId);
    if (conv) {
      conv.last_message = content;
      conv.last_message_at = msg.created_at;
      if (senderId === conv.customer_id) {
        conv.unread_count_professional += 1;
      } else {
        conv.unread_count_customer += 1;
      }
    }

    return msg;
  }

  // ==========================================
  // SAVED PROFESSIONALS (MODULE 10)
  // ==========================================
  getSavedProfessionals(userId: string): ProfessionalProfile[] {
    const savedIds = this.savedProfessionals
      .filter(s => s.user_id === userId)
      .map(s => s.professional_id);
    return this.professionals.filter(p => savedIds.includes(p.id));
  }

  isProfessionalSaved(userId: string, proId: string): boolean {
    return this.savedProfessionals.some(s => s.user_id === userId && s.professional_id === proId);
  }

  toggleSaveProfessional(userId: string, proId: string): boolean {
    const idx = this.savedProfessionals.findIndex(s => s.user_id === userId && s.professional_id === proId);
    if (idx !== -1) {
      this.savedProfessionals.splice(idx, 1);
      return false; // un-saved
    } else {
      this.savedProfessionals.push({
        id: "save-" + Date.now(),
        user_id: userId,
        professional_id: proId,
        saved_at: new Date().toISOString(),
      });
      return true; // saved
    }
  }

  // ==========================================
  // IN-APP NOTIFICATIONS (MODULE 11)
  // ==========================================
  getNotifications(userId: string): AppNotification[] {
    return this.notifications
      .filter(n => n.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  markNotificationAsRead(id: string): boolean {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.is_read = true;
      return true;
    }
    return false;
  }

  markAllNotificationsAsRead(userId: string): number {
    let count = 0;
    this.notifications.forEach(n => {
      if (n.user_id === userId && !n.is_read) {
        n.is_read = true;
        count++;
      }
    });
    return count;
  }

  deleteNotification(id: string): boolean {
    const idx = this.notifications.findIndex(n => n.id === id);
    if (idx !== -1) {
      this.notifications.splice(idx, 1);
      return true;
    }
    return false;
  }

  clearNotifications(userId: string): number {
    const before = this.notifications.length;
    this.notifications = this.notifications.filter(n => n.user_id !== userId);
    return before - this.notifications.length;
  }

  private userNotificationPreferences: Record<string, NotificationPreferences> = {};

  getNotificationPreferences(userId: string): NotificationPreferences {
    if (!this.userNotificationPreferences[userId]) {
      this.userNotificationPreferences[userId] = {
        civic_issue_status: true,
        comment_reply: true,
        idea_update: true,
        development_update: true,
        event_reminder: true,
        announcement: true,
        service_bookings: true,
        email_digest: false,
      };
    }
    return { ...this.userNotificationPreferences[userId] };
  }

  updateNotificationPreferences(userId: string, prefs: Partial<NotificationPreferences>): NotificationPreferences {
    const current = this.getNotificationPreferences(userId);
    this.userNotificationPreferences[userId] = { ...current, ...prefs };
    return { ...this.userNotificationPreferences[userId] };
  }

  addNotification(notif: Omit<AppNotification, 'id' | 'created_at' | 'is_read'>): AppNotification {
    const newNotif: AppNotification = {
      ...notif,
      id: "notif-" + Date.now() + Math.random().toString(36).substring(2, 5),
      is_read: false,
      created_at: new Date().toISOString(),
    };
    this.notifications.unshift(newNotif);
    return newNotif;
  }
}

// Global Singleton
const globalForStore = globalThis as unknown as { appStore: DataStore };
export const store = globalForStore.appStore || new DataStore();
if (process.env.NODE_ENV !== "production") globalForStore.appStore = store;
