//package com.telerikacademy.beertag.serviceTests;
//
//import com.telerikacademy.beertag.models.dtos.UserDto;
//import com.telerikacademy.beertag.service.UserService;
//import org.junit.Before;
//import org.junit.Test;
//import org.springframework.orm.hibernate5.HibernateTemplate;
//
//import static org.mockito.Mockito.mock;
//
//public class FooServiceUnitTest {
//
//    private UserService instance;
//
//    private HibernateTemplate hibernateTemplateMock;
//
//    @Before
//    public void before() {
//        this.instance =  new UserService() {
//        };
//        this.instance.
//        this.hibernateTemplateMock = mock(HibernateTemplate.class);
//        this.instance.setHibernateTemplate(this.hibernateTemplateMock);
//    }
//
//    @Test
//    public void whenCreateIsTriggered_thenNoException() {
//        // When
//        this.instance.create(new Foo("testName"));
//    }
//
//    @Test(expected = NullPointerException.class)
//    public void whenCreateIsTriggeredForNullEntity_thenException() {
//        // When
//        this.instance.create(null);
//    }
//
//    @Test
//    public void whenCreateIsTriggered_thenEntityIsCreated() {
//        // When
//        Foo entity = new Foo("testName");
//        this.instance.create(entity);
//
//        // Then
//        ArgumentCaptor<Foo> argument = ArgumentCaptor.forClass(Foo.class);
//        verify(this.hibernateTemplateMock).save(argument.capture());
//        assertThat(entity, is(argument.getValue()));
//    }
//
//}
//}
